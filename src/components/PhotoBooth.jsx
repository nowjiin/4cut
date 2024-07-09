import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PhotoBooth = () => {
  const [photos, setPhotos] = useState([]);
  const [timer, setTimer] = useState(30);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Reference to the video stream
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFrame } = location.state;

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { aspectRatio: 9 / 16 },
        });
        streamRef.current = stream; // Save the stream reference
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    };

    getCameraStream();

    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(countdown);
      stopStream();
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      takePhoto();
      setTimer(30); // reset timer for next photo
    }
  }, [timer]);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const takePhoto = () => {
    if (photos.length < 6) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const photo = canvas.toDataURL('image/png');
      setPhotos([...photos, photo]);
      setTimer(30); // reset timer for next photo
    }
  };

  useEffect(() => {
    if (photos.length === 6) {
      stopStream();
      navigate('/photo-selection', { state: { photos, selectedFrame } });
    }
  }, [photos, navigate, selectedFrame]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Take Photos</h1>
      <div>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: '100%', maxWidth: '300px', aspectRatio: '9/16' }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
          width='720'
          height='1280'
        ></canvas>
      </div>
      <div>
        <p>{photos.length}/6 photos taken</p>
        <p>Time left: {timer} seconds</p>
      </div>
      <button
        onClick={takePhoto}
        style={{
          margin: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Take Photo
      </button>
    </div>
  );
};

export default PhotoBooth;
