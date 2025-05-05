import React, { useState } from 'react';
import './education.css';
import { education_data } from './education_data.js';
import { motion } from 'framer-motion';
import { School, LocationOn, DateRange, Link as LinkIcon, ExpandMore, ExpandLess } from '@mui/icons-material';

function Education({ darkMode }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`education-section ${darkMode ? 'dark' : ''}`} id="education">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="timeline">
          {education_data.map((edu, index) => (
            <motion.div 
              className="timeline-item"
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-dot" style={{ background: `${edu.color}` }}></div>
              
              <motion.div 
                className={`timeline-content ${expandedId === edu.id ? 'expanded' : ''}`}
                whileHover={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                style={{ borderTopColor: edu.color }}
              >
                <div className="timeline-header" onClick={() => toggleExpand(edu.id)}>
                  <div className="institution-logo">
                    <img src={edu.logo} alt={edu.name} />
                  </div>
                  
                  <div className="timeline-title">
                    <h3>{edu.name}</h3>
                    <h4>{edu.degree}</h4>
                    <p className="field">{edu.field}</p>
                  </div>
                  
                  <div className="expand-icon">
                    {expandedId === edu.id ? <ExpandLess /> : <ExpandMore />}
                  </div>
                </div>
                
                <div className="timeline-info">
                  <div className="info-item">
                    <DateRange /> 
                    <span>{edu.years}</span>
                  </div>
                  <div className="info-item">
                    <LocationOn />
                    <span>{edu.location}</span>
                  </div>
                  <div className="info-item">
                    <a href={edu.website} target="_blank" rel="noopener noreferrer">
                      <LinkIcon />
                      <span>Website</span>
                    </a>
                  </div>
                </div>
                
                {expandedId === edu.id && (
                  <motion.div 
                    className="timeline-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="description">{edu.description}</p>
                    
                    {edu.courses.length > 0 && (
                      <div className="courses">
                        <h5>Relevant Coursework</h5>
                        <ul>
                          {edu.courses.map((course, i) => (
                            <li key={i}>{course}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {edu.achievements.length > 0 && (
                      <div className="achievements">
                        <h5>Achievements</h5>
                        <ul>
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;