// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https
const https = require('https');
const http = require('http');

//Error printing function
function printError(error) {
    console.error(error.message);
}


//Print message to console
function printMessage(userName, badgeCount, points) {
    const message = `${userName} has ${badgeCount} total badge(s) and ${points} points in Javascript`;
    console.log(message);
}

function get(username) {
    try {
// Connect to the API URL (https://teamtreehouse.com/ryanluttrell.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200) {

// Read the data
                let body = '';
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
// Parse the JSON data
                    try {
                        const profile = JSON.parse(body);
// Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
                const statusCodeError = new Error(message);
                printError(statusCodeError)
            }
        });
        request.on('error', printError);
        
    } catch (error) {
        printError(error);
    }
}

module.exports.get = get;