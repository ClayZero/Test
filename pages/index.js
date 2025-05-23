import { useState } from 'react';
import Head from 'next/head'; // Import Head for title

export default function SendMessagePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback('');

    if (!phoneNumber || !message) {
      setFeedback('Phone number and message cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback(data.message || 'Message sent successfully!');
        setPhoneNumber('');
        setMessage('');
      } else {
        setFeedback(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFeedback('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>Send WhatsApp Message</title>
      </Head>
      <h1>Send WhatsApp Message</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>Phone Number (with country code):</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., +12345678900"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 15px' }}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {feedback && (
        <p style={{ marginTop: '15px', color: feedback.startsWith('Failed') || feedback.startsWith('An unexpected') || feedback.startsWith('Phone number') ? 'red' : 'green' }}>
          {feedback}
        </p>
      )}
    </div>
  );
}
