// server/app.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const convert = require('xml-js');

const app = express();

app.use(cors({
    origin: 'https://effulgent-trifle-9c5447.netlify.app',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));

app.get('/getData', async (req, res) => {
    try {
        const apiUrl = 'https://www.nfqs.go.kr/hpmg/front/api/radioactivityDailyRslt.do';
        const apiKey = 'C539B9DD6931BE5B7111F75C546DA864F336BDED75E268E157ACF4D5361DC80D';

        const response = await axios.get(apiUrl, {
            params: {
                cert_key: apiKey,
                inspType: '01',
            },
        });

        const jsonData = convert.xml2json(response.data, { compact: true, spaces: 4 });
        res.status(200).json(JSON.parse(jsonData));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4001, () => {
    console.log('Server is running on port 4001');
});
