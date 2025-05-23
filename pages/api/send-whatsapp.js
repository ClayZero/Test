import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { phoneNumber, message } = req.body;

  // Basic validation
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Phone number and message are required.' });
  }

  // Validate phone number format (basic check, can be improved with a library)
  // Twilio expects E.164 format, e.g., +12345678900
  if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number format. Please use E.164 format (e.g., +12345678900).' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioWhatsappFrom = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !twilioWhatsappFrom) {
    console.error('Twilio credentials are not configured in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: Twilio credentials missing.' });
  }

  const client = twilio(accountSid, authToken);

  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${twilioWhatsappFrom}`, // Your Twilio WhatsApp number
      to: `whatsapp:${phoneNumber}`,       // Recipient's WhatsApp number
    });
    return res.status(200).json({ message: 'WhatsApp message queued successfully!' });
  } catch (error) {
    console.error('Twilio API Error:', error);
    // Provide a more specific error message if available from Twilio
    const errorMessage = error.message || 'Failed to send WhatsApp message via Twilio.';
    // Twilio errors often have a 'status' property that could be used,
    // but for simplicity, we'll use 500 for all Twilio API errors here.
    return res.status(500).json({ error: errorMessage });
  }
}
