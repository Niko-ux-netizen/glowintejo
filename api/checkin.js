import axios from 'axios';

export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Extract uniqueId from query parameters
        const { uniqueId } = req.query;

        // Validate uniqueId
        if (!uniqueId) {
            return res.status(400).json({ checkedIn: false, error: 'No uniqueId provided in the URL' });
        }

        // Make a request to the external API
        const response = await axios.get(
            'https://script.google.com/macros/s/AKfycbzVzz2UdUAMSPtmsv1XegU45aT0n3ueLwcB0eE2F5ndILKyFdwV0ZBNPiVDMct1f-vU/exec',
            { params: { uniqueId } }
        );

        // Respond with the data from the external API
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in check-in process:', error.message);
        res.status(500).json({ checkedIn: false, error: 'Error during check-in process' });
    }
}
