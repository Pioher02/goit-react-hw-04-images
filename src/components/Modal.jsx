import propTypes from 'prop-types';

const Modal = ({ largeImage, onClosed }) => {
  window.addEventListener('keydown', closeModal);

  function closeModal(e) {
    if (e.key === 'Escape') {
      onClosed();
      window.removeEventListener('keydown', closeModal);
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: propTypes.string.isRequired,
  onClosed: propTypes.func.isRequired,
};

export default Modal;
