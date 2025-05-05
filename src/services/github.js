/**
 * GitHub API integration service
 * Fetches repository data and user information from GitHub API
 */

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USERNAME = 'Bikram-ghuku';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check if cached data is still valid
 * @param {Object} cachedData - The cached data with timestamp
 * @returns {boolean} - Whether the cached data is still valid
 */
const isCacheValid = (cachedData) => {
  if (!cachedData || !cachedData.timestamp) return false;
  const now = new Date().getTime();
  return now - cachedData.timestamp < CACHE_DURATION;
};

/**
 * Get cached data from localStorage
 * @param {string} key - The cache key
 * @returns {Object|null} - The cached data or null if no valid cache
 */
const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(`github_${key}`);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    if (isCacheValid(data)) {
      console.log(`Using cached data for ${key}`);
      return data.value;
    }
    
    // Clear invalid cache
    localStorage.removeItem(`github_${key}`);
    return null;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
};

/**
 * Save data to localStorage cache
 * @param {string} key - The cache key
 * @param {Object} data - The data to cache
 */
const saveToCache = (key, data) => {
  try {
    const cacheData = {
      timestamp: new Date().getTime(),
      value: data
    };
    localStorage.setItem(`github_${key}`, JSON.stringify(cacheData));
    console.log(`Saved ${key} to cache`);
  } catch (error) {
    console.error('Cache saving error:', error);
  }
};

/**
 * Fetch user profile information from GitHub API
 * @returns {Promise<Object>} - User profile data
 */
export const fetchGitHubProfile = async () => {
  const cacheKey = 'profile';
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    console.log('Fetching GitHub profile data...');
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw error;
  }
};

/**
 * Fetch repositories from GitHub API
 * @param {number} maxRepos - Maximum number of repositories to return (default: 100)
 * @returns {Promise<Array>} - List of repositories
 */
export const fetchPinnedRepos = async (maxRepos = 100) => {
  const cacheKey = 'github_repos';
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    console.log('Fetching GitHub repositories...');
    // Fetch first page with max 100 repos (GitHub API limit per page)
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API response: ${errorText}`);
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const repos = await response.json();
    console.log(`Fetched ${repos.length} repositories from GitHub`);
    
    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error('No repositories returned from GitHub API');
    }
    
    // Sort repositories by multiple factors: pinned status, stars, forks, and recency
    const sortedRepos = repos
      .filter(repo => !repo.fork) // Filter out forks
      .sort((a, b) => {
        // Score based on engagement (stars and forks)
        const aEngagement = (a.stargazers_count * 3) + (a.forks_count * 2);
        const bEngagement = (b.stargazers_count * 3) + (b.forks_count * 2);
        
        // Score based on recency (higher for newer)
        const aUpdated = new Date(a.pushed_at).getTime();
        const bUpdated = new Date(b.pushed_at).getTime();
        
        // Recent activity gets priority (70% recency, 30% engagement)
        const aScore = (aEngagement * 0.3) + ((aUpdated / 1000000000) * 0.7);
        const bScore = (bEngagement * 0.3) + ((bUpdated / 1000000000) * 0.7);
        
        return bScore - aScore;
      })
      .slice(0, maxRepos); // Limit to maxRepos
    
    console.log(`Selected ${sortedRepos.length} repositories to display`);
    
    // Batch fetch languages for performance (only for the first 20 repos to avoid rate limits)
    const reposToFetchLangs = sortedRepos.slice(0, 20);
    
    await Promise.all(
      reposToFetchLangs.map(async (repo) => {
        try {
          const langResponse = await fetch(repo.languages_url, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          });
          
          if (langResponse.ok) {
            repo.languages = await langResponse.json();
          }
        } catch (error) {
          console.warn(`Could not fetch languages for ${repo.name}`);
          repo.languages = {};
        }
      })
    );
    
    // For repos beyond the first 20, set empty languages object
    sortedRepos.slice(20).forEach(repo => {
      repo.languages = {};
    });
    
    saveToCache(cacheKey, sortedRepos);
    return sortedRepos;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
};

/**
 * Get repository statistics (stars, forks, etc.)
 * @param {string} repoName - The repository name
 * @returns {Promise<Object>} - Repository statistics
 */
export const fetchRepoStats = async (repoName) => {
  const cacheKey = `repo_stats_${repoName}`;
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching stats for ${repoName}:`, error);
    throw error;
  }
};

/**
 * Format repository data to be used in the project component
 * @param {Array} repos - List of GitHub repositories
 * @returns {Array} - Formatted project data
 */
export const formatReposAsProjects = (repos) => {
  if (!Array.isArray(repos) || repos.length === 0) {
    console.warn('No repos to format as projects');
    return [];
  }
  
  console.log(`Formatting ${repos.length} repositories as projects`);
  
  return repos.map(repo => {
    // Convert languages object to an array of strings
    const languages = repo.languages ? Object.keys(repo.languages).join(', ') : '';
    
    return {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      about: repo.description || `A ${languages} project`,
      status: repo.archived ? 'Archived' : 'Active',
      tech: languages,
      img: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      demo: repo.homepage || null,
      githubData: true
    };
  });
};

/**
 * Extract skills/languages from GitHub repositories
 * @returns {Promise<Object>} - Object containing language stats and repositories count
 */
export const extractGitHubSkills = async () => {
  const cacheKey = 'github_skills';
  const cached = getFromCache(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    console.log('Extracting skills from GitHub repositories...');
    
    // First get repositories
    const repos = await fetchPinnedRepos(100);
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      console.warn('No repositories found to extract skills from');
      return { languages: {}, repoCount: 0 };
    }
    
    // Process languages from all repositories
    let languageTotals = {};
    let languageRepos = {}; // Count of repos using each language
    let frameworksUsed = new Set();
    
    // Identify frameworks and tools from repo names and descriptions
    const frameworkKeywords = {
      'React': ['react', 'reactjs', 'react-native', 'next', 'nextjs', 'gatsby'],
      'Node.js': ['node', 'nodejs', 'express', 'nestjs', 'koa'],
      'MongoDB': ['mongo', 'mongodb', 'mongoose'],
      'PostgreSQL': ['postgres', 'postgresql', 'pg'],
      'Docker': ['docker', 'container', 'dockerfile'],
      'Kubernetes': ['kubernetes', 'k8s', 'kubectl'],
      'AWS': ['aws', 'amazon', 's3', 'lambda', 'ec2'],
      'TensorFlow': ['tensorflow', 'tf', 'keras'],
      'PyTorch': ['pytorch', 'torch'],
      'Django': ['django'],
      'Flask': ['flask'],
      'Angular': ['angular', 'ng'],
      'Vue.js': ['vue', 'vuejs', 'vuex', 'nuxt'],
      'Next.js': ['next', 'nextjs'],
      'Svelte': ['svelte', 'sveltekit'],
      'TypeScript': ['typescript', 'ts'],
      'GraphQL': ['graphql', 'apollo', 'gql'],
      'Rust': ['rust', 'cargo', 'rustc'],
      'Go': ['go', 'golang'],
      'LangChain': ['langchain'],
      'LangGraph': ['langgraph'],
      'MaterialUI': ['mui', 'material-ui', 'material ui'],
      'Bootstrap': ['bootstrap'],
      'Tailwind': ['tailwind', 'tailwindcss'],
      'Laravel': ['laravel', 'artisan'],
      'Swift': ['swift', 'ios'],
      'Kotlin': ['kotlin', 'android'],
      'Flutter': ['flutter', 'dart'],
      'Unity': ['unity', 'unity3d'],
      'Electron': ['electron'],
      'WebGL': ['webgl', 'three.js', 'threejs'],
      'Sass': ['sass', 'scss'],
      'LLM': ['llm', 'large language model', 'gpt', 'llama', 'bert'],
      'Machine Learning': ['ml', 'machine learning', 'ai', 'artificial intelligence', 'neural', 'deep learning'],
    };
    
    // Extract languages and detect frameworks
    for (const repo of repos) {
      // Process languages directly from GitHub API
      if (repo.languages && typeof repo.languages === 'object') {
        Object.entries(repo.languages).forEach(([lang, bytes]) => {
          if (!languageTotals[lang]) languageTotals[lang] = 0;
          if (!languageRepos[lang]) languageRepos[lang] = 0;
          
          languageTotals[lang] += bytes;
          languageRepos[lang]++;
        });
      }
      
      // Detect frameworks and tools from repo name and description
      const textToAnalyze = [
        repo.name,
        repo.description,
        repo.topics ? repo.topics.join(' ') : ''
      ].join(' ').toLowerCase();
      
      // Check for framework keywords
      Object.entries(frameworkKeywords).forEach(([framework, keywords]) => {
        if (keywords.some(keyword => textToAnalyze.includes(keyword))) {
          frameworksUsed.add(framework);
        }
      });
    }
    
    // Calculate percentages and sort by usage
    const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
    
    const languages = Object.entries(languageTotals)
      .map(([language, bytes]) => ({
        name: language,
        percentage: totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0,
        repoCount: languageRepos[language] || 0,
        bytes
      }))
      .sort((a, b) => b.bytes - a.bytes);
    
    // Format frameworks
    const frameworks = Array.from(frameworksUsed);
    
    const result = {
      languages,
      frameworks,
      repoCount: repos.length
    };
    
    saveToCache(cacheKey, result);
    console.log('Extracted skills data:', result);
    return result;
  } catch (error) {
    console.error('Error extracting GitHub skills:', error);
    return { languages: {}, frameworks: [], repoCount: 0 };
  }
};

const export_funs =  {
  fetchGitHubProfile,
  fetchPinnedRepos,
  fetchRepoStats,
  formatReposAsProjects,
  extractGitHubSkills
}; 

export default export_funs;