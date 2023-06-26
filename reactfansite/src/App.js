import React, { useState } from 'react';
import DecryptPath from './decryptPath';

function App() {
  const [encryptedLink, setEncryptedLink] = useState('');
  const [key, setKey] = useState('');
  const [decryptedLink, setDecryptedLink] = useState('');

  const handleDecrypt = () => {
    // Call your decryption logic here
    const decryptedPath = DecryptPath(encryptedLink, key);
    setDecryptedLink(decryptedPath);
  };

  return (
    <div>
      <label htmlFor="encryptedLink">Encrypted Link:  </label>
      <input
        type="text"
        value={encryptedLink}
        onChange={(e) => setEncryptedLink(e.target.value)}
        placeholder="Enter encrypted link"
      />
      <br />
      <label htmlFor="key">Key:  </label>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedLink && (
        <p>
          {decryptedLink}
        </p>
      )}
    </div>
  );
}

export default App;
