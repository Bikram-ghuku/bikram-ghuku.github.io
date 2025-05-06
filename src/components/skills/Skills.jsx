import React from 'react'
import './skills.css'
import { skills_data } from '../../skills'
import { motion } from 'framer-motion'

function Skills({ darkMode }) {
  const categories = {
    'Languages': ['Python', 'Javascript', 'Typescript','HTML', 'CSS', 'Rust', 'Go', 'C++'],
    'Frameworks & Libraries': ['React', 'Node', 'Express', 'Bootstrap', 'MaterialUI', 'Next.js', 'LangChain', 'LangGraph'],
    'Databases': ['MongoDB', 'PostgreSQL', 'MySQL'],
    'Tools & Technologies': ['Git', 'Github', 'Docker', 'Kubernetes', 'Kafka']
  }

  const getSkillsByCategory = (category) => {
    return skills_data.filter(skill => 
      categories[category].includes(skill.Name)
    )
  }

  return (
    <div className={`skills-section ${darkMode ? 'dark' : ''}`} id="skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        
        <div className="skills-content">
          {Object.keys(categories).map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {getSkillsByCategory(category).map((skill, skillIndex) => (
                  <motion.div 
                    className="skill-card" 
                    key={skill.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                  >
                    <div className="skill-img-container">
                      <img src={skill.img} alt={skill.Name} className="skill-img" />
                    </div>
                    <h4 className="skill-name">{skill.Name}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills