import CryptoJS from "crypto-js";

const decryptPath = function (pathEncrypted, key) {
  if (!pathEncrypted || !key) {
    return pathEncrypted;
  }
  try {
    // The APP_KEY in .env file. Note that it is base64 encoded binary
    // var key = 'L3p2JtrHrYmH+UHxTOUKE3fdtzdSjdjXRt6plfaL16M=';

    // Laravel creates a JSON to store iv, value and a mac and base64 encodes it.
    // So let's base64 decode the string to get them.
    pathEncrypted = JSON.parse(atob(pathEncrypted));

    // Decrypt the value, providing the IV.
    var decrypted = CryptoJS.AES.decrypt(
      pathEncrypted.value,
      CryptoJS.enc.Base64.parse(key),
      {
        iv: CryptoJS.enc.Base64.parse(pathEncrypted.iv),
      }
    );

    // CryptoJS returns a word array which can be
    // converted to string like this
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return pathEncrypted;
  }
};

export default decryptPath;
