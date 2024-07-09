import { useLocation } from 'react-router-dom';
import { useState } from 'react';
//import frameImage from '../assets/frame1.png'; // Use the frame image you provided

const PhotoSelection = () => {
  const location = useLocation();
  const { photos, selectedFrame } = location.state;
  const [selectedPhotos, setSelectedPhotos] = useState([
    null,
    null,
    null,
    null,
  ]);

  const handlePhotoSelect = (index, photo) => {
    const newSelectedPhotos = [...selectedPhotos];
    newSelectedPhotos[index] = photo;
    setSelectedPhotos(newSelectedPhotos);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h5>Select Photos for Frame</h5>
      <div>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            style={{
              width: '100px',
              margin: '10px',
              cursor: 'pointer',
              aspectRatio: '9/16',
              objectFit: 'cover',
            }}
            onClick={() => handlePhotoSelect(index % 4, photo)} // Ensure photos are placed in the 4 slots
          />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Selected Frame</h2>
        <div style={{ position: 'relative', width: '600px', margin: 'auto' }}>
          <img src={selectedFrame} alt='Frame' style={{ width: '100%' }} />
          {selectedPhotos[0] && (
            <img
              src={selectedPhotos[0]}
              alt='Selected 1'
              style={{
                position: 'absolute',
                top: '12%', // Adjust this to position correctly
                left: '10%', // Adjust this to position correctly
                width: '35%', // Adjust this to fit the frame slot
                height: 'auto',
              }}
            />
          )}
          {selectedPhotos[1] && (
            <img
              src={selectedPhotos[1]}
              alt='Selected 2'
              style={{
                position: 'absolute',
                top: '12%', // Adjust this to position correctly
                right: '10%', // Adjust this to position correctly
                width: '35%', // Adjust this to fit the frame slot
                height: 'auto',
              }}
            />
          )}
          {selectedPhotos[2] && (
            <img
              src={selectedPhotos[2]}
              alt='Selected 3'
              style={{
                position: 'absolute',
                bottom: '12%', // Adjust this to position correctly
                left: '10%', // Adjust this to position correctly
                width: '35%', // Adjust this to fit the frame slot
                height: 'auto',
              }}
            />
          )}
          {selectedPhotos[3] && (
            <img
              src={selectedPhotos[3]}
              alt='Selected 4'
              style={{
                position: 'absolute',
                bottom: '12%', // Adjust this to position correctly
                right: '10%', // Adjust this to position correctly
                width: '35%', // Adjust this to fit the frame slot
                height: 'auto',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoSelection;
