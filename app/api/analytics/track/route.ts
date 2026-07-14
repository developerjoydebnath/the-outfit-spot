import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type || !['visit', 'whatsapp', 'messenger'].includes(type)) {
      return NextResponse.json({ error: 'Invalid tracking type' }, { status: 400 });
    }

    await trackEvent(type as 'visit' | 'whatsapp' | 'messenger');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
