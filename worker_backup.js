export default {
    async fetch(request, env, ctx) {
        // --- CORS Headers ---
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        };

        // Handle CORS Preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const password = request.headers.get('X-Admin-Password');
        const url = new URL(request.url);

        // --- Route: Send Email via Resend ---
        if (url.pathname === '/send-email' && request.method === 'POST') {
            try {
                const { recipient, pdfBase64, filename, subject } = await request.json();

                // Auth for email sending too
                if (password !== env.ACCESS_PASSWORD) {
                    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
                        status: 401, headers: corsHeaders
                    });
                }

                if (!env.RESEND_API_KEY) {
                    return new Response(JSON.stringify({ success: false, error: 'Resend API Key missing in Cloudflare Secrets' }), {
                        status: 500, headers: corsHeaders
                    });
                }

                // Resend requires a verified domain to use custom 'from' addresses.
                // If you haven't verified fatdesign.at, use 'onboarding@resend.dev'
                const senderEmail = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

                const resendRes = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: senderEmail,
                        to: recipient,
                        cc: 'fat.design@outlook.com',
                        subject: subject || 'Ihr Dokument von FAT DESIGN',
                        html: `<p>Anbei erhalten Sie Ihr Dokument als PDF.</p><p>Beste Grüße,<br><strong>FAT DESIGN</strong></p>`,
                        attachments: [
                            {
                                filename: filename || 'dokument.pdf',
                                content: pdfBase64,
                            },
                        ],
                    }),
                });

                const resendData = await resendRes.json();
                return new Response(JSON.stringify(resendData), {
                    status: resendRes.status, headers: corsHeaders
                });
            } catch (err) {
                return new Response(JSON.stringify({ success: false, error: err.message }), {
                    status: 500, headers: corsHeaders
                });
            }
        }

        // --- Route: Auth Check (Existing) ---
        // Check against the secret ACCESS_PASSWORD set in Cloudflare Dashboard
        if (password === env.ACCESS_PASSWORD) {
            return new Response(JSON.stringify({ success: true, message: 'Authorized' }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Unauthorized
        return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    },
};
