import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.RESEND_TO_EMAIL ?? 'pa.garciaperezvela@ugto.mx';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const SITE_URL = process.env.SITE_URL ?? 'https://patodev.com';
/** Simple in-memory rate limiter (resets on cold start). */
const ipLimits = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
function isRateLimited(ip) {
    const now = Date.now();
    const entry = ipLimits.get(ip);
    if (!entry || now > entry.resetAt) {
        ipLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }
    entry.count += 1;
    return entry.count > MAX_REQUESTS;
}
function sanitize(str) {
    return str.trim().slice(0, 2000);
}
function setCors(req, res) {
    const origin = req.headers.origin;
    const allowedOrigins = new Set([
        SITE_URL,
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
        'http://localhost:5173',
    ]);
    if (origin && allowedOrigins.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
export default async function handler(req, res) {
    setCors(req, res);
    // CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    const { name, email, subject, message, website } = req.body ?? {};
    // Honeypot anti-spam field: real users never fill it.
    if (website) {
        return res.status(200).json({ success: true });
    }
    if (!isNonEmptyString(name) ||
        !isNonEmptyString(email) ||
        !isNonEmptyString(subject) ||
        !isNonEmptyString(message)) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (name.length > 120 || email.length > 254 || subject.length > 160 || message.length > 2000) {
        return res.status(400).json({ error: 'One or more fields are too long.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: sanitize(subject),
            text: `Name: ${sanitize(name)}\nEmail: ${sanitize(email)}\n\n${sanitize(message)}`,
            replyTo: sanitize(email),
        });
        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
        return res.status(200).json({ success: true, id: data?.id });
    }
    catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
