const https = require('https');

/**
 * Make a request to the GitHub API to get a user's most recent activity
 * 
 * @param {string} username  - Name of the user whose activity we want to see
 * @returns {Promise<Object[]>} - Promise with an array of JSON objects with user activity events
 * 
 * @throws {Error} - Throws an error if the user is not found or the response code is not 200
 */
const fetchGitHubData = (username) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/events`;

        // GitHub API requires a User-Agent
        const options = {
            headers: {
                'User-Agent': 'node.js'
            }
        };

        https.get(url, options, (res) => {

            // Store data in chunks
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve(jsonData);
                    } catch (error) {
                        reject(`Error parsing JSON: ${error.message}`);
                    }
                } else if (res.statusCode === 404) {
                    reject('User not found');
                } else {
                    reject(`Error: Status Code ${res.statusCode}`);
                }
            });
        }).on('error', (error) => {
            reject(`Request error: ${error.message}`);
        });
    });
};



/**
 * Format and log GitHub events
 * 
 * @param {Object[]} events - Array of GitHub event objects. 
 * 
 * The function displays the following types of events:
 * - PushEvent: Shows the number of commits pushed to a repository.
 * - IssuesEvent: Shows the action performed on an issue in a repository.
 * - WatchEvent: Shows when a user stars a repository.
 * - CreateEvent: Shows when a branch or tag is created in a repository.
 * - Default: Logs the event type if it's not one of the above.
 */
const formatGitHubEvents = (events) => {
    events.forEach(event => {
        const repoName = event.repo.name;

        switch (event.type) {
            case 'PushEvent':
                const commitCount = event.payload.commits.length;
                console.log(`Pushed ${commitCount} commit(s) to ${repoName}`);
            case 'IssuesEvent':
                const issueAction = event.payload.action || 'Unknown';
                console.log(`${issueAction.charAt(0).toUpperCase() + issueAction.slice(1)} an issue in ${repoName}`);
            case 'WatchEvent':
                console.log(`Starred ${repoName}`);
            case 'CreateEvent':
                console.log(`Created ${event.payload.ref_type} in ${repoName}`);
            default:
                console.log(`${event.type} in ${repoName}`);
        }
    })
}





const username = process.argv[2];

fetchGitHubData(username)
    .then((events) => {
        formatGitHubEvents(events);
    })
    .catch((error) => {
        console.error(`Error getting user activity: ${error}`);
    });