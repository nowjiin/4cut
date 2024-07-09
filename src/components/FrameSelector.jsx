import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import frameImage1 from '../assets/frame1.png';
import frameImage2 from '../assets/frame2.png';

const FrameSelector = () => {
  const [selectedFrame, setSelectedFrame] = useState(frameImage1);
  const navigate = useNavigate();

  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
  };

  const startPhotoBooth = () => {
    navigate('/photo-booth', { state: { selectedFrame } });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Choose Your Frame</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <img
          src={frameImage1}
          alt='Frame 1'
          style={{
            width: '40%',
            maxWidth: '300px',
            border:
              selectedFrame === frameImage1
                ? '3px solid #646cff'
                : '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
          onClick={() => handleFrameSelect(frameImage1)}
        />
        <img
          src={frameImage2}
          alt='Frame 2'
          style={{
            width: '40%',
            maxWidth: '300px',
            border:
              selectedFrame === frameImage2
                ? '3px solid #646cff'
                : '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
          onClick={() => handleFrameSelect(frameImage2)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={startPhotoBooth}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Start Taking Photos
        </button>
      </div>
    </div>
  );
};

export default FrameSelector;
