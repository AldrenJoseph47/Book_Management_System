// src/utils/bodyParser.js
// The parseRequestBody function reads the data from the request in chunks and then attempts
// to parse it as JSON. This is necessary in plain Node.js because it does not automatically
// parse JSON bodies like frameworks do.

function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        // Listen for data events
        req.on("data", chunk => {
            body += chunk.toString(); // Append each chunk of data
        });

        // Listen for end event, when the entire body is received
        req.on("end", () => {
            try {
                // Attempt to parse the JSON body
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch (error) {
                reject(new Error("Invalid JSON format"));
            }
        });

        // Handle errors
        req.on("error", (error) => {
            reject(error);
        });
    });
}

module.exports = { parseRequestBody };
