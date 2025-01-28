const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const path = require('path');

// Set up readline interface for capturing user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Function to fetch reviews from the provided base URL
async function fetchReviews(twinglyPart, companyName, startDate, endDate, size = 10) {
    const baseURL = `https://data.${twinglyPart}.net/review/c/search/v1/search`;  // Construct full URL using twingly input
   
    const requestBody = {
        all: [companyName],
        languages: ["en"],
        size: size,
        published_time: {
            since: startDate,
            until: endDate
        }
    };

    const headers = {
        'Authorization': 'apikey 5A7D8412-4834-4B01-908C-93B08F322A0C',  // Replace with your actual API key
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8'
    };

    try {
        // Make the API request to the constructed base URL
        const response = await axios.post(baseURL, requestBody, { headers });

        console.log('Full Response:', JSON.stringify(response.data, null, 2));

        if (response.data.hits && response.data.hits.length > 0) {
            // Reviews found
            const reviews = response.data.hits.map(hit => ({
                title: hit.title,
                description: hit.description,
                date: hit.published,
                url: hit.url
            }));

            // Save reviews to a JSON file
            fs.writeFileSync('reviews.json', JSON.stringify(reviews, null, 2), 'utf8');
            console.log('Reviews saved to reviews.json');
        } else {
            console.log('');
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Main function to get user input and fetch reviews
async function main() {
    
    const companyName = await askQuestion("Enter the company name: ");
    const startDate = await askQuestion("Enter the start date (in YYYY-MM-DDTHH:mm:ssZ format) e.g., 2025-01-17T17:30:00Z: ");
    const endDate = await askQuestion("Enter the end date (in YYYY-MM-DDTHH:mm:ssZ format) e.g., 2025-01-17T27:30:00Z: ");
    const twinglyPart = await askQuestion("Enter the Source (e.g., 'twingly'): ");
   
    // Close the readline interface after inputs
    rl.close();

    // Fetch the reviews using the provided input
    await fetchReviews(twinglyPart, companyName, startDate, endDate);

    // Start the server to allow downloading of the JSON file
    const app = express();
    const port = 3000;

    // Route to handle file download
    app.get('/download', (req, res) => {
        const filePath = path.join(__dirname, 'reviews.json');
       
        // Check if the file exists
        fs.exists(filePath, (exists) => {
            if (exists) {
                res.download(filePath, 'reviews.json', (err) => {
                    if (err) {
                        console.log("Error downloading file:", err);
                    }
                });
            } else {
                res.status(404).send("File not found.");
            }
        });
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Run the main function
main();
