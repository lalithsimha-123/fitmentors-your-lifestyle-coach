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

    // Log the lead data
    console.log('New lead submitted:', leadData);

    // Send email notification via Formspree
    try {
      const emailResponse = await fetch('https://formspree.io/f/xyzpqwer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadData.name,
          goal: leadData.goal,
          whatsapp: leadData.whatsapp,
          timestamp: leadData.createdAt.toISOString(),
          ip: leadData.ip,
          _subject: `New Lead: ${leadData.name}`,
          _replyto: leadData.whatsapp,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Email notification failed:', emailResponse.statusText);
        // Don't fail the main request, just log the email error
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue anyway - form was submitted successfully even if email failed
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Lead submitted successfully. We will contact you soon!',
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
