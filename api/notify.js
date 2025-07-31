export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ip, userAgent } = req.body;
  const time = new Date().toLocaleString();

  // Get location from IP using ipapi.co (no key required)
  let locationText = 'Unknown Location';
  try {
    const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const locData = await locRes.json();

    if (locData && !locData.error) {
      locationText = `${locData.city}, ${locData.region}, ${locData.country_name}`;
    }
  } catch (e) {
    // Fallback stays as "Unknown Location"
  }

  const message = `👀 New Visit!\n📅 Time: ${time}\n🌐 IP: ${ip}\n📍 Location: ${locationText}\n📱 Agent: ${userAgent}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
      }),
    });

    const data = await telegramRes.json();

    if (!data.ok) {
      return res.status(500).json({ error: 'Telegram API failed', detail: data });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
