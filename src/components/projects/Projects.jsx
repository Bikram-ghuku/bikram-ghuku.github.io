import React, { useState, useEffect } from 'react';
import './projects.css';
import { projects_data } from '../../projects';
import { GitHub, Language, Code, Star, CallSplit, Visibility, Refresh, Search, FilterList, KeyboardArrowDown } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPinnedRepos, formatReposAsProjects } from '../../services/github';

function Projects({ darkMode }) {
  const [visibleProjects, setVisibleProjects] = useState(12);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const [error, setError] = useState(null);
  const [showGitHub, setShowGitHub] = useState(true);
  const [showManual, setShowManual] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent'); // 'recent', 'stars', 'name'
  
  const loadGitHubProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading GitHub projects...');
      // Load up to 100 repos (can be adjusted)
      const repos = await fetchPinnedRepos(100);
      console.log('Received repos:', repos);
      
      if (!repos || repos.length === 0) {
        console.warn('No GitHub repositories found');
        setGithubProjects([]);
        setError('No GitHub repositories found. Showing manually added projects only.');
      } else {
        const formattedRepos = formatReposAsProjects(repos);
        console.log('Formatted repos:', formattedRepos);
        setGithubProjects(formattedRepos);
      }
    } catch (err) {
      console.error('Error loading GitHub projects:', err);
      setError('Failed to load GitHub projects. Showing manually added projects only.');
      setGithubProjects([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadGitHubProjects();
  }, []);
  
  // Combine GitHub projects with manually added projects
  const allProjects = [
    ...(showGitHub ? githubProjects : []),
    ...(showManual ? projects_data : [])
  ];
  
  // Filter projects based on tech tags and search term
  const filteredProjects = allProjects.filter(project => {
    // Filter by technology tag
    const matchesTech = filter === 'all' || 
      (project.tech && project.tech.toLowerCase().includes(filter.toLowerCase()));
    
    // Filter by search term
    const projectName = (project.name || project.Name || '').toLowerCase();
    const projectDesc = (project.about || '').toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      projectName.includes(searchTermLower) || 
      projectDesc.includes(searchTermLower);
    
    return matchesTech && matchesSearch;
  });
  
  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'stars':
        const aStars = a.stars || 0;
        const bStars = b.stars || 0;
        return bStars - aStars;
      case 'name':
        const aName = (a.name || a.Name || '').toLowerCase();
        const bName = (b.name || b.Name || '').toLowerCase();
        return aName.localeCompare(bName);
      case 'recent':
      default:
        // GitHub projects are already sorted by recency
        // For mixed display, prioritize GitHub projects
        if (a.githubData && !b.githubData) return -1;
        if (!a.githubData && b.githubData) return 1;
        return 0;
    }
  });
  
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 12);
  };

  // Extract unique tech tags from all projects
  const allTechTags = new Set(['all']);
  allProjects.forEach(project => {
    if (project.tech) {
      project.tech.split(',').forEach(tag => {
        allTechTags.add(tag.trim());
      });
    }
  });
  
  const projectTags = Array.from(allTechTags);

  return (
    <div className={`projects-section ${darkMode ? 'dark' : ''}`} id="projects">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        
        <motion.div 
          className="project-source-toggle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <button 
            className={`source-btn ${showGitHub ? 'active' : ''}`} 
            onClick={() => setShowGitHub(!showGitHub)}
            disabled={loading}
          >
            <GitHub /> GitHub Projects {githubProjects.length ? `(${githubProjects.length})` : ''}
          </button>
          <button 
            className={`source-btn ${showManual ? 'active' : ''}`} 
            onClick={() => setShowManual(!showManual)}
          >
            <Code /> Other Projects {projects_data.length ? `(${projects_data.length})` : ''}
          </button>
        </motion.div>
        
        <motion.div 
          className="project-controls"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <label className="sort-label">
              <FilterList className="sort-icon" />
              <span>Sort by:</span>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="recent">Most Recent</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name (A-Z)</option>
              </select>
              <KeyboardArrowDown className="arrow-icon" />
            </label>
          </div>
          
          {showGitHub && (
            <button 
              className="refresh-btn" 
              onClick={loadGitHubProjects} 
              disabled={loading}
            >
              <Refresh /> Refresh
            </button>
          )}
        </motion.div>
        
        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projectTags.map((tag, index) => (
            <button 
              key={index} 
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading projects from GitHub...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="refresh-btn" onClick={loadGitHubProjects}>
              <Refresh /> Retry
            </button>
          </div>
        )}
        
        {!loading && sortedProjects.length === 0 && (
          <div className="no-projects-message">
            <p>No projects match your search criteria. Please try different filters or terms.</p>
            <button className="refresh-btn" onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}>
              Clear Filters
            </button>
          </div>
        )}
        
        {!loading && sortedProjects.length > 0 && (
          <div className="results-summary">
            Showing {Math.min(visibleProjects, sortedProjects.length)} of {sortedProjects.length} projects
          </div>
        )}
        
        <AnimatePresence>
          <div className="projects-grid">
            {sortedProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div 
                className="project-card glass-card"
                key={project.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 1) }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <div className="project-img-container">
                  <img src={project.img} alt={project.name || project.Name} className="project-img" loading="lazy" />
                  {project.githubData && (
                    <div className="github-badge">
                      <GitHub fontSize="small" />
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                        <GitHub />
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
                          <Language />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.name || project.Name}</h3>
                  <p className="project-description">{project.about}</p>
                  
                  <div className="project-tech">
                    {(project.tech || '').split(',').map((tech, i) => (
                      tech.trim() && (
                        <span 
                          key={i} 
                          className="tech-tag"
                          onClick={() => setFilter(tech.trim())}
                        >
                          {tech.trim()}
                        </span>
                      )
                    ))}
                  </div>
                  
                  <div className="project-stats">
                    {project.githubData && (
                      <>
                        {project.stars > 0 && (
                          <div className="stat-item">
                            <Star fontSize="small" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks > 0 && (
                          <div className="stat-item">
                            <CallSplit fontSize="small" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="project-status">
                      <span className={`status ${(project.status || '').toLowerCase()}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        
        {visibleProjects < sortedProjects.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMoreProjects}>
              Load More ({Math.min(12, sortedProjects.length - visibleProjects)} more)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
