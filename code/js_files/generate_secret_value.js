const crypto = require('crypto');

// Function to generate a random token secret
function generateTokenSecret(length) {
    // Generate random bytes
    const randomBytes = crypto.randomBytes(length);

    // Convert random bytes to base64 encoding
    const tokenSecret = randomBytes.toString('base64');

    // Return the generated token secret
    return tokenSecret;
}

// Usage example: Generate a random token secret with length 32
const randomTokenSecret = generateTokenSecret(32);
console.log(randomTokenSecret);
