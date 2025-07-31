export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get IP and User Agent from headers
  const {ip} = req.body

  const userAgent = req.headers['user-agent'] || 'Unknown Agent';

  // Format time in IST
  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

  // Location from IP
  let locationText = 'Unknown Location';
  try {
    const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const locData = await locRes.json();

    if (locData && !locData.error) {
      locationText = `${locData.city}, ${locData.region}, ${locData.country_name}`;
    }
  } catch (e){

  }

  

  const message = `👀 New Visit!
📅 Time: ${time}
🌐 IP: ${ip}
📍 Location: ${locationText}
📱 Agent: ${userAgent}`;

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
