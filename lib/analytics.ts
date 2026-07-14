import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json');

export interface AnalyticsData {
  visits: number;
  whatsapp_clicks: number;
  messenger_clicks: number;
}

export async function getAnalytics(): Promise<AnalyticsData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return default
    return {
      visits: 0,
      whatsapp_clicks: 0,
      messenger_clicks: 0,
    };
  }
}

export async function trackEvent(type: 'visit' | 'whatsapp' | 'messenger') {
  try {
    const data = await getAnalytics();
    
    if (type === 'visit') {
      data.visits += 1;
    } else if (type === 'whatsapp') {
      data.whatsapp_clicks += 1;
    } else if (type === 'messenger') {
      data.messenger_clicks += 1;
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Failed to update analytics:', error);
    return null;
  }
}
