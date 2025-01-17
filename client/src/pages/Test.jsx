import React, { useEffect, useState, useRef } from 'react';

const VideoPlayer = () => {
  const [devices, setDevices] = useState({ videoDevices: [], audioDevices: [] });
  const [selectedVideoDevice, setSelectedVideoDevice] = useState('');
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const getDevices = async () => {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceInfos.filter(device => device.kind === 'videoinput');
      const audioDevices = deviceInfos.filter(device => device.kind === 'audioinput');
      setDevices({ videoDevices, audioDevices });
    };

    getDevices();
  }, []);

  useEffect(() => {
    const getStream = async () => {
      if (selectedVideoDevice || selectedAudioDevice) {
        const constraints = {
          video: selectedVideoDevice ? { deviceId: { exact: selectedVideoDevice } } : true,
          audio: selectedAudioDevice ? { deviceId: { exact: selectedAudioDevice } } : true,
        };

        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing media devices.', error);
        }
      }
    };

    getStream();
  }, [selectedVideoDevice, selectedAudioDevice]);

  return (
    <div>
      <h2>Video Player</h2>
      <div>
        <label htmlFor="videoInput">Video Input:</label>
        <select
          id="videoInput"
          value={selectedVideoDevice}
          onChange={(e) => setSelectedVideoDevice(e.target.value)}
        >
          {devices.videoDevices.map((device, index) => (
            <option key={index} value={device.deviceId}>{device.label || `Camera ${index + 1}`}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="audioInput">Audio Input:</label>
        <select
          id="audioInput"
          value={selectedAudioDevice}
          onChange={(e) => setSelectedAudioDevice(e.target.value)}
        >
          {devices.audioDevices.map((device, index) => (
            <option key={index} value={device.deviceId}>{device.label || `Microphone ${index + 1}`}</option>
          ))}
        </select>
      </div>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default VideoPlayer;