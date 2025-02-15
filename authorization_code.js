require('dotenv').config(); // dotenv importieren, um .env zu laden

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/exchange-code', async (req, res) => {
    const authorizationCode = req.body.code;
    const clientId = process.env.CLIENT_ID; // Umgebungsvariable verwenden
    const clientSecret = process.env.CLIENT_SECRET; // Umgebungsvariable verwenden
    const redirectUri = process.env.REDIRECT_URI; // Umgebungsvariable verwenden

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
            code: authorizationCode,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        }));

        const accessToken = response.data.access_token;
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Fehler beim Abrufen des Tokens:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Tokens' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});

