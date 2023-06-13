import { createPortal } from 'react-dom';
import Modal from './Modal';
const { Component } = require('react');

class ImageGallery extends Component {
  static defaultProps = { showImages: [] };
  state = {
    showModal: false,
    largeImage: '',
  };

  render() {
    const { showImages } = this.props;
    const { showModal } = this.state;

    return (
      <ul className="gallery">
        {showImages.map(showImage => (
          <li key={showImage.id} className="galleryItem">
            <img
              src={showImage.webformatURL}
              alt={showImage.id}
              className="galleryItem-image"
              onClick={() => {
                this.setState({ showModal: true });
                this.setState({ largeImage: showImage.largeImageURL });
              }}
            />
          </li>
        ))}
        {showModal &&
          createPortal(
            <Modal
              largeImage={this.state.largeImage}
              onClosed={() => this.setState({ showModal: false })}
            />,
            document.body
          )}
      </ul>
    );
  }
}

export default ImageGallery;
