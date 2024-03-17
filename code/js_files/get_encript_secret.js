const sodium = require("libsodium-wrappers");
// const secret = '1234'
// const key = 'aayvtq0H0LYlRLEPMKVBIPeLRPmNwFAEUgTxo+orCTw='

const secret = process.argv[2];
const key = process.argv[3];

//Check if libsodium is ready and then proceed.
sodium.ready.then(() => {
  // Convert the secret and key to a Uint8Array.
  let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  let binsec = sodium.from_string(secret);

  // Encrypt the secret using libsodium
  let encBytes = sodium.crypto_box_seal(binsec, binkey);

  // Convert the encrypted Uint8Array to Base64
  let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

  // Print the output
  console.log('Print encrypted value');
  console.log(output);
});
