import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="intro" spy={true} smooth={true} offset={-70} duration={500}>
            BG
          </Link>
        </div>
        
        <div className="mobile-icon" onClick={toggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="intro" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="about" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="education" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              Education
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="skills" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="projects" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500} 
              onClick={closeMenu}
              activeClass="active"
            >
              Contact
            </Link>
          </li>
          <li className="nav-item theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 