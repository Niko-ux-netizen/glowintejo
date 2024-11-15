const axios = require('axios');
const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors());
app.use(express.json());
app.get('/checkin', async (req, res) => {
    try {
        const uniqueId = req.query.uniqueId;
        if (!uniqueId) {
            return res.status(400).json({ checkedIn: false, error: 'No uniqueId provided in the URL' });
        }
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbwd_DbvNFiSLkWP7nRuKwY9ce7xit6aJhN_OkMo3lfCk0MgNefREHi5SK4TwbDN1RyLyQ/exec`, {
            params: { uniqueId: uniqueId }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error in check-in process:', error);
        res.status(500).json({ checkedIn: false, error: 'Error during check-in process' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
