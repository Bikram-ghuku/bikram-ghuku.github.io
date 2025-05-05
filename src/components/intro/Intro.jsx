import React from 'react'
import './intro.css'
import img from '../../img/me.png'
import Typewriter from 'typewriter-effect'
import { motion } from 'framer-motion'
import { GitHub, LinkedIn, Twitter, Code, Article, ArrowDownward } from '@mui/icons-material'

function Intro({ darkMode }) {
  return (
    <div className={`i ${darkMode ? 'dark' : ''}`} id="intro">
      <div className="bg-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>

      <div className="container intro-container">
        <motion.div 
          className="i-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="i-text-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="i-greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="greeting-line"></div>
              <h2>Hello, I'm</h2>
            </motion.div>
            
            <motion.h1 
              className="i-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Bikram Ghuku
            </motion.h1>
            
            <motion.div 
              className="i-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="i-title-wrapper">
                <Typewriter
                  options={{
                    strings: [
                      'Software Developer', 
                      'Open Source Contributor', 
                      'Full Stack Engineer', 
                      'Problem Solver',
                      'Algorithm Specialist',
                      'MERN Stack Developer'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            </motion.div>
            
            <motion.p 
              className="i-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              A passionate Software Developer and Computer Science student at IIT Kharagpur, 
              creating efficient, scalable applications and contributing to open source projects. 
              I combine strong technical fundamentals with creative problem-solving to build 
              software solutions that make a difference.
            </motion.p>
            
            <motion.div 
              className="i-skills-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="i-skills">
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >JavaScript</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >React</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >Next.js</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >Node.js</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >Rust</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >Go</motion.span>
                <motion.span 
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >PostgreSQL</motion.span>
              </div>
            </motion.div>
            
            <motion.div 
              className="i-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="i-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <motion.a 
                href="https://github.com/bikram-ghuku" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon github"
              >
                <GitHub />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/bikram-ghuku/" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon linkedin"
              >
                <LinkedIn />
              </motion.a>
              <motion.a 
                href="https://twitter.com/bikramghuku" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon twitter"
              >
                <Twitter />
              </motion.a>
              <motion.a 
                href="#projects" 
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon code"
              >
                <Code />
              </motion.a>
              <motion.a 
                href="#" 
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon article"
              >
                <Article />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="i-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="image-bg">
              <div className="image-blob"></div>
              <div className="image-glow"></div>
              <div className="image-circle"></div>
              <motion.img 
                src={img} 
                alt="Bikram Ghuku" 
                className="i-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
            
            <div className="floating-elements">
              <motion.div 
                className="floating-element element-1"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              <motion.div 
                className="floating-element element-2"
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -15, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              
              <motion.div 
                className="floating-element element-3"
                animate={{ 
                  x: [0, 15, 0],
                  y: [0, -10, 0],
                  rotate: [0, 20, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut" 
                }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.a 
        href="#about" 
        className="scroll-down"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span>Scroll Down</span>
        <ArrowDownward />
      </motion.a>
    </div>
  )
}

export default Intro