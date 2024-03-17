// const crypto = require('crypto');
//
// // Function to generate a random token secret
// function generateTokenSecret(length) {
//     // Generate random bytes
//     const randomBytes = crypto.randomBytes(length);
//
//     // Convert random bytes to base64 encoding
//     const tokenSecret = randomBytes.toString('base64');
//
//     // Return the generated token secret
//     return tokenSecret;
// }
//
// // Usage example: Generate a random token secret with length 32
// const randomTokenSecret = generateTokenSecret(32);
// console.log(randomTokenSecret);


// Function to generate a random token secret
function generateTokenSecret(length) {
    // Define characters that can be used in the token secret
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Initialize an empty string to store the token secret
    let tokenSecret = '';

    // Loop to generate random characters until the desired length is reached
    for (let i = 0; i < length; i++) {
        // Generate a random index to select a character from the chars string
        const randomIndex = Math.floor(Math.random() * chars.length);

        // Append the selected character to the token secret
        tokenSecret += chars[randomIndex];
    }

    // Return the generated token secret
    return tokenSecret;
}

// Usage example: Generate a random token secret with length 32
const randomTokenSecret = generateTokenSecret(32);
console.log(randomTokenSecret);
