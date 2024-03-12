console.log('Hello from my Node.js script!');

const { Buffer } = require("buffer");

const encodedSecret = process.env.UI_URL; // Access the encoded secret from environment variables
console.log('encodedSecret', encodedSecret);
const decodedSecret = Buffer.from(encodedSecret, "base64").toString("utf-8");
console.log(decodedSecret);
