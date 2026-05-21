import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    // Replace these credentials with your actual EmailJS keys
    const serviceId = 'service_adhuu3b';
    const templateId = 'template_c6467og';
    const publicKey = 'Gf7ZRhL8OHbgJ7Ej';

    emailjs
      .sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setStatus({ type: 'success', message: 'Message sent successfully 🚀' });
          setIsSending(false);
          if (formRef.current) formRef.current.reset();

          // Clear status after 5 seconds
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus({ type: 'error', message: 'Failed to send message ❌' });
          setIsSending(false);
        }
      );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form-wrapper"
      style={{
        padding: '3rem',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'inherit'
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #fff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          Send me a message
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>
          I'd love to hear from you. Let's build something amazing together!
        </p>
      </div>

      <div className="form-group" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <label style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Full Name</label>
        <input
          type="text"
          name="from_name"
          placeholder="Enter your full name"
          required
          style={inputStyles}
        />
      </div>

      <div className="form-group" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <label style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email Address</label>
        <input
          type="email"
          name="from_email"
          placeholder="Enter your email"
          required
          style={inputStyles}
        />
      </div>

      <div className="form-group" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <label style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your Message</label>
        <textarea
          name="message"
          rows="5"
          placeholder="Write your message here..."
          required
          style={{ ...inputStyles, resize: 'vertical', minHeight: '120px' }}
        ></textarea>
      </div>

      {status && (
        <div style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '0.95rem',
          color: status.type === 'success' ? '#34d399' : '#ef4444'
        }}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSending}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
          padding: '1rem',
          fontSize: '1.1rem',
          borderRadius: '12px',
          marginTop: '0.5rem',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          border: 'none',
          cursor: isSending ? 'not-allowed' : 'pointer',
          opacity: isSending ? 0.7 : 1,
          width: '100%',
          fontWeight: '600'
        }}
        onMouseOver={(e) => {
          if (!isSending) {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(59,130,246,0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!isSending) {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        <span>{isSending ? 'Sending...' : 'Send Message'}</span>
        {!isSending && <Send size={18} />}
      </button>
    </form>
  );
};

// Base Input styles
const inputStyles = {
  width: '100%',
  padding: '1.2rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: 'white',
  fontFamily: 'inherit',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  outline: 'none',
  boxSizing: 'border-box'
};

export default ContactForm;
