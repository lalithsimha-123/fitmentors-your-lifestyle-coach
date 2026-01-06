import { Handler } from '@netlify/functions';

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

    // Create lead data object
    const leadData: LeadData = {
      name,
      goal,
      whatsapp,
      createdAt: new Date(),
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'],
    };

    // Log the lead data (for debugging/monitoring)
    console.log('New lead submitted:', leadData);

    // TODO: Implement your preferred notification method here:
    // Option 1: Send email via Netlify email service
    // Option 2: Send to a webhook service (Zapier, Make, etc.)
    // Option 3: Store in a database
    // Option 4: Send to Slack/Discord webhook

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Lead submitted successfully',
        timestamp: leadData.createdAt,
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
