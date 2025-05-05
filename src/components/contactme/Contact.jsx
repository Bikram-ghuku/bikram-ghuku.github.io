import React, { useState, useRef, useEffect } from 'react'
import { AiFillMail } from 'react-icons/ai'
import { FaLocationDot } from 'react-icons/fa6'
import emailjs from 'emailjs-com'
import { EMAILJS_CONFIG } from '../../services/emailjs-config'
import './contact.css'

function Contact({ darkMode }) {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    sending: false,
    sent: false,
    error: false,
    errorMessage: '',
    configError: false
  });

  // Check if EmailJS is properly configured
  useEffect(() => {
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.USER_ID) {
      setFormStatus(prev => ({
        ...prev,
        configError: true,
        errorMessage: 'Contact form is not configured. Please set up the environment variables.'
      }));
      console.warn('EmailJS environment variables are missing. Contact form will not work.');
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation
  const validateForm = () => {
    const { user_name, user_email, message } = formData;
    
    if (!user_name.trim()) {
      setFormStatus({
        ...formStatus,
        error: true,
        errorMessage: 'Please enter your name'
      });
      return false;
    }
    
    if (!user_email.trim()) {
      setFormStatus({
        ...formStatus,
        error: true,
        errorMessage: 'Please enter your email'
      });
      return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user_email)) {
      setFormStatus({
        ...formStatus,
        error: true,
        errorMessage: 'Please enter a valid email address'
      });
      return false;
    }
    
    if (!message.trim()) {
      setFormStatus({
        ...formStatus,
        error: true,
        errorMessage: 'Please enter your message'
      });
      return false;
    }
    
    setFormStatus({
      ...formStatus,
      error: false,
      errorMessage: ''
    });
    
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for missing configuration
    if (formStatus.configError) {
      setFormStatus({
        ...formStatus,
        error: true,
        errorMessage: 'Contact form is not configured properly. Please try another contact method.'
      });
      return;
    }
    
    if (!validateForm()) return;
    
    setFormStatus({
      ...formStatus,
      sending: true
    });
    
    emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      formRef.current,
      EMAILJS_CONFIG.USER_ID
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setFormStatus({
        sending: false,
        sent: true,
        error: false,
        errorMessage: '',
        configError: false
      });
      
      // Reset form data
      setFormData({
        user_name: '',
        user_email: '',
        user_subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, sent: false }));
      }, 5000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setFormStatus({
        sending: false,
        sent: false,
        error: true,
        errorMessage: 'Failed to send message. Please try again later.',
        configError: false
      });
    });
  };

  return (
    <div className={`c ${darkMode ? 'dark' : ''}`} id="contact">
        <div className="c-bg"></div>
        <div className="c-wrapper">
            <div className="c-left">
                <h1 className="c-title">Contact Me</h1>
                <div className="c-info">
                    <div className="c-info-item">
                        <AiFillMail className='c-icon' />
                        bikramghuku05@gmail.com
                    </div>
                    <div className="c-info-item">
                        <FaLocationDot className='c-icon' />
                        IIT Campus, IIT Kharagpur, West Bengal, India
                    </div>
                </div>
            </div>
            <div className="c-right">
                <div className="c-card">
                    <p className='c-desc'>
                        Message me to talk about anything. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                    <form className="c-form" ref={formRef} onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="user_name" 
                            value={formData.user_name}
                            onChange={handleChange}
                            disabled={formStatus.configError}
                            className="c-input"
                        />
                        <input 
                            type="text" 
                            placeholder="Subject" 
                            name="user_subject" 
                            value={formData.user_subject}
                            onChange={handleChange}
                            disabled={formStatus.configError}
                            className="c-input"
                        />
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="user_email" 
                            value={formData.user_email}
                            onChange={handleChange}
                            disabled={formStatus.configError}
                            className="c-input"
                        />
                        <textarea 
                            rows="5" 
                            placeholder="Message" 
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            disabled={formStatus.configError}
                            className="c-textarea"
                        />
                        
                        {formStatus.error && (
                            <div className="c-error-message">
                                {formStatus.errorMessage}
                            </div>
                        )}
                        
                        {formStatus.sent && (
                            <div className="c-success-message">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        
                        {formStatus.configError && (
                            <div className="c-config-error">
                                <p>Contact form requires configuration.</p>
                                <p>Please email me directly at: bikramghuku05@gmail.com</p>
                            </div>
                        )}
                        
                        <button 
                            type="submit" 
                            className={`c-btn ${formStatus.sending ? 'c-btn-loading' : ''}`}
                            disabled={formStatus.sending || formStatus.configError}
                        >
                            {formStatus.sending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact