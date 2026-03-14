export default async function handler(req, res) {
    // Chỉ cho phép phương thức POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Lấy link Webhook từ biến môi trường của Vercel
    const DISCORD_WEBHOOK_URL = process.env.WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
        return res.status(500).json({ error: 'Chưa cấu hình Webhook URL' });
    }

    try {
        // Chuyển tiếp request từ Roblox Script sang Discord
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (response.ok) {
            return res.status(200).json({ success: true, message: 'Đã gửi tới Discord' });
        } else {
            return res.status(response.status).json({ error: 'Lỗi từ Discord API' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
