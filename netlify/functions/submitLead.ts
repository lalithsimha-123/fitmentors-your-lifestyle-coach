import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const mongoUri = process.env.MONGODB_URI!;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_FROM!;
const recipientWhatsAppNumber = process.env.RECIPIENT_WHATSAPP_NUMBER!;

interface LeadData {
  name: string;
  goal: string;
  whatsapp: string;
  createdAt: Date;
  ip?: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, goal, whatsapp } = body;

    // Validation
    if (!name || !goal || !whatsapp) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Connect to MongoDB
    const client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db('fitmentors');
    const leadsCollection = db.collection('leads');

    // Create lead document
    const leadData: LeadData = {
      name,
      goal,
      whatsapp,
      createdAt: new Date(),
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'],
    };

    // Insert into MongoDB
    const result = await leadsCollection.insertOne(leadData);

    // Send WhatsApp message via Twilio
    const whatsappMessage = `New Lead Submitted!\n\nName: ${name}\nGoal: ${goal}\nWhatsApp: ${whatsapp}\n\nTimestamp: ${new Date().toLocaleString()}`;

    await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      new URLSearchParams({
        From: twilioWhatsAppNumber,
        To: recipientWhatsAppNumber,
        Body: whatsappMessage,
      }),
      {
        auth: {
          username: twilioAccountSid,
          password: twilioAuthToken,
        },
      }
    );

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Lead submitted successfully',
        leadId: result.insertedId,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };
