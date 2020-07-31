// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https
const https = require('https');


//Print message to console
function printMessage(userName, badgeCount, points) {
    const message = `${userName} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
    console.log(message);
}

function getProfile(username) {

// Connect to the API URL (https://teamtreehouse.com/ryanluttrell.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

// Read the data
        let body = '';
        response.on('data', data => {
            body += data.toString();
        });
        response.on('end', () => {
// Parse the JSON data
            const profile = JSON.parse(body);
// Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        })
    })
}

const users = process.argv.slice(2)
users.forEach(getProfile);