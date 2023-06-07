import CryptoJS from "crypto-js";

const decryptPath = function (pathEncrypted) {
  // The APP_KEY in .env file. Note that it is base64 encoded binary
  var key = 'yEmwS+o74qu10FsyoM9RSKyxEWorTc0XA+gg67AI64Q=';

  // Laravel creates a JSON to store iv, value and a mac and base64 encodes it.
  // So let's base64 decode the string to get them.
  pathEncrypted = JSON.parse(atob(pathEncrypted));

  // Decrypt the value, providing the IV.
  var decrypted = CryptoJS.AES.decrypt(pathEncrypted.value, CryptoJS.enc.Base64.parse(key), {
    iv: CryptoJS.enc.Base64.parse(pathEncrypted.iv)
  });

  // CryptoJS returns a word array which can be
  // converted to string like this
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export default decryptPath;
