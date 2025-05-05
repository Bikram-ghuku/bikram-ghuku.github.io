/**
 * EmailJS Configuration
 * 
 * To use this service:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create an email template with the following variables:
 *    - {{user_name}}
 *    - {{user_email}}
 *    - {{user_subject}}
 *    - {{message}}
 * 4. Add your EmailJS credentials to .env file:
 *    - REACT_APP_EMAILJS_SERVICE_ID
 *    - REACT_APP_EMAILJS_TEMPLATE_ID
 *    - REACT_APP_EMAILJS_USER_ID
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
};

// Initialize EmailJS (optional, can also be done in your Contact component)
// Use this if you want to initialize EmailJS as soon as the app loads
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.USER_ID) {
    // Importing EmailJS in this way to prevent it from being included
    // if the function is not called anywhere
    import('emailjs-com').then(emailjs => {
      emailjs.init(EMAILJS_CONFIG.USER_ID);
    });
  } else {
    console.warn('EmailJS not initialized: Missing USER_ID environment variable');
  }
}; 