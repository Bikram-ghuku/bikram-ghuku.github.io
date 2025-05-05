import './about.css';
import { AiFillLinkedin, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';
import { FaHackerrank } from 'react-icons/fa';
import { SiCodeforces } from 'react-icons/si';
import React from 'react'
import profImg from '../../img/meFull.jpg'
import { motion } from 'framer-motion'

function About({ darkMode }) {
  return (
    <div className={`a ${darkMode ? 'dark-mode' : ''}`} id="about">
        <motion.div 
            className="a-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="a-card bg"></div>
            <motion.div 
                className="a-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <img src={profImg} alt='Bikram Ghuku - Software Developer' className="a-img" />
            </motion.div>
        </motion.div>

        <motion.div 
            className="a-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h1 className='a-title'>About Me</h1>
            <p className="a-sub">
                Hello, I'm <strong>Bikram Ghuku</strong>, a passionate Software Developer and Computer Science Engineering student at the prestigious <u>Indian Institute of Technology, Kharagpur</u>. 
                I specialize in building robust, scalable applications and contributing to open source projects that make a difference.
            </p>
            <p className="a-sub">
                With a strong foundation in the <u>MERN stack</u> and proficiency in multiple programming languages including <strong>JavaScript</strong>, <strong>Python</strong>, and <strong>C++</strong>, 
                I develop software solutions that combine clean code principles with efficient algorithms. My experience spans from building responsive web applications to implementing complex backend systems.
            </p>
            <p className="a-sub">
                Beyond coding, I'm an enthusiastic competitive programmer and chess player, applying strategic thinking and problem-solving skills in both my technical and recreational pursuits.
            </p>
            
            <motion.div 
                className="a-expertise"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h3>My Expertise</h3>
                <div className="expertise-grid">
                    <motion.div 
                        className="expertise-item"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h4>Full Stack Development</h4>
                        <p>Building end-to-end applications with React, Node.js, Express, and MongoDB</p>
                    </motion.div>
                    <motion.div 
                        className="expertise-item"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h4>Open Source Contribution</h4>
                        <p>Active contributor to community projects with meaningful code and documentation</p>
                    </motion.div>
                    <motion.div 
                        className="expertise-item"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h4>Algorithm Design</h4>
                        <p>Creating efficient, optimized solutions for complex computational problems</p>
                    </motion.div>
                    <motion.div 
                        className="expertise-item"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h4>Software Architecture</h4>
                        <p>Designing scalable, maintainable application structures following best practices</p>
                    </motion.div>
                </div>
            </motion.div>
            
            <div className="a-social">
                <motion.a 
                    href="https://www.instagram.com/bikramghuku05/" 
                    className="a-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiOutlineInstagram className='a-icons' />
                </motion.a>
                <motion.a 
                    href="https://www.linkedin.com/in/bikram-ghuku/" 
                    className="a-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillLinkedin className='a-icons' />
                </motion.a>
                <motion.a 
                    href="https://www.github.com/bikram-ghuku" 
                    className="a-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiFillGithub className='a-icons' />
                </motion.a>
                <motion.a 
                    href="https://www.hackerrank.com/bikramghuku05" 
                    className="a-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaHackerrank className='a-icons' />
                </motion.a>
                <motion.a 
                    href="https://codeforces.com/profile/bikramghuku" 
                    className="a-icon"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SiCodeforces className='a-icons' />
                </motion.a>
            </div>
        </motion.div>
    </div>
  )
}

export default About