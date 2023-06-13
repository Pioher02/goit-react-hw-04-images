import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import Modal from './Modal';
import { useState } from 'react';

const ImageGallery = ({ showImages }) => {
  const [showModal, setShowmodal] = useState(false);
  const [largeImage, setLargeimage] = useState('');

  return (
    <ul className="gallery">
      {showImages.map(showImage => (
        <li key={showImage.id} className="galleryItem">
          <img
            src={showImage.webformatURL}
            alt={showImage.id}
            className="galleryItem-image"
            onClick={() => {
              setShowmodal(true);
              setLargeimage(showImage.largeImageURL);
            }}
          />
        </li>
      ))}
      {showModal &&
        createPortal(
          <Modal
            largeImage={largeImage}
            onClosed={() => setShowmodal(false)}
          />,
          document.body
        )}
    </ul>
  );
};

ImageGallery.propTypes = {
  showImages: propTypes.array.isRequired,
};

export default ImageGallery;
