import { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

function App() {
  const [layout, setLayout] = useState('2x2');
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    }
    loadModels();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const capturePhoto = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    let imageData = context.getImageData(0, 0, 640, 480);

    // 실시간 보정 필터 적용
    imageData = applyFilter(imageData);
    context.putImageData(imageData, 0, 0);

    const photoUrl = canvasRef.current.toDataURL('image/png');
    setPhotos([...photos, photoUrl]);
  };

  const applyFilter = (imageData) => {
    // 여기에 필터 코드 작성
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    return imageData;
  };

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  const handlePhotoSelect = (photo) => {
    if (selectedPhotos.length < 4) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handlePhotoCombine = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (layout === '2x2') {
      canvas.width = 400;
      canvas.height = 400;
      selectedPhotos.forEach((photo, index) => {
        const img = new Image();
        img.src = photo;
        img.onload = () => {
          const x = (index % 2) * 200;
          const y = Math.floor(index / 2) * 200;
          context.drawImage(img, x, y, 200, 200);
          if (index === 3) {
            saveImage(canvas);
          }
        };
      });
    } else {
      canvas.width = 800;
      canvas.height = 200;
      selectedPhotos.forEach((photo, index) => {
        const img = new Image();
        img.src = photo;
        img.onload = () => {
          const x = index * 200;
          context.drawImage(img, x, 0, 200, 200);
          if (index === 3) {
            saveImage(canvas);
          }
        };
      });
    }
  };

  const saveImage = (canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'combined.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='App'>
      <h1>Photo Combiner</h1>
      <div>
        <label>
          Layout:
          <select value={layout} onChange={handleLayoutChange}>
            <option value='2x2'>2x2</option>
            <option value='4x1'>4x1</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={capturePhoto} disabled={photos.length >= 8}>
          Capture Photo
        </button>
      </div>
      <video
        ref={videoRef}
        width='640'
        height='480'
        autoPlay
        style={{ display: 'block', margin: '0 auto' }}
      ></video>
      <canvas
        ref={canvasRef}
        width='640'
        height='480'
        style={{ display: 'none' }}
      ></canvas>
      <div>
        <h2>Photos</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt='preview'
              width='100'
              onClick={() => handlePhotoSelect(photo)}
              style={{
                border: selectedPhotos.includes(photo)
                  ? '2px solid red'
                  : 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handlePhotoCombine}
        disabled={selectedPhotos.length !== 4}
      >
        Combine Photos
      </button>
      <div>
        <h2>Combined Photo</h2>
        <img id='combined-photo' alt='Combined Photo' />
      </div>
    </div>
  );
}

export default App;
