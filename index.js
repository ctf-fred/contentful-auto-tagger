const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/webhook', async (req, res) => {
    const event = req.body;

    console.log('Received event:', event);

    // Handle different event types here
    switch(event.sys.type) {
        case 'Entry':
            if (event.sys.createdAt === event.sys.updatedAt) {
                console.log('New entry created:', event);
                // Handle new entry creation
            } else {
                console.log('Entry updated:', event);
                // Handle entry update
            }
            break;
        case 'ContentType':
            console.log('Content type event:', event);
            // Handle content type events
            break;
        default:
            console.log('Unhandled event type:', event.sys.type);
    }

    res.status(200).send('Event received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
