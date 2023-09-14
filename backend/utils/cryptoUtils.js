const CryptoJS = require("crypto-js");
const encryptionKey = 'fullstack_developer@2327_secret_key';

const algorithm = 'AES';
const mode = 'CBC';
const key = CryptoJS.enc.Utf8.parse(encryptionKey);
const iv = CryptoJS.lib.WordArray.random(16);


exports.encryptCode = (data) => {
  const dataToEncode = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedHex = CryptoJS.enc.Hex.stringify(dataToEncode);
  return encodedHex
};


exports.decryptCode = (encryptedData) => {
  const decodedData = CryptoJS.enc.Hex.parse(encryptedData);
  const decodedText = CryptoJS.enc.Utf8.stringify(decodedData);
  const decodedObj = JSON.parse(decodedText);
  return decodedObj
};
