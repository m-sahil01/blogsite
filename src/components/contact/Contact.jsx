import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    emailjs.send(
      'service_ffge8kh',
      'template_ouklgp6',
      templateParams,
      'SA3ZJ7uIGwjXLQMYa'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 5000); // Optional: Hide the success message after 5 seconds
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className='contactForm'>
        <label htmlFor="name" className='contactLable'>Name:</label>
        <input type="text" id="name" name="name" className='contactInput' placeholder='Your Name' required />

        <label htmlFor="email" className='contactLable'>Email Address:</label>
        <input type="email" id="email" name="email" className='contactInput' placeholder='Mail Address' required />

        <label htmlFor="message" className='contactLable'>Message:</label>
        <textarea id="message" name="message" rows="4" className='contactTextarea' placeholder='Any Message for Me' required />

        <button type="submit" className='contactButton'>Submit</button>
        {submitted && <p className="success-message">Submitted Successfully!</p>}
      </form>
    </div>
  );
}
