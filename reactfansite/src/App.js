import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleStop = () => {
    setPlaying(false);
  };

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  return (
    <div>
      <h1>Video Player</h1>
      <input type="text" value={videoUrl} onChange={handleInputChange} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
      <ReactPlayer url={videoUrl} playing={playing} controls />
    </div>
  );
};

export default App;
