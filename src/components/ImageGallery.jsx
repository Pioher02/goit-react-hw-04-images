import * as basicLightbox from 'basiclightbox';
const { Component } = require('react');

class ImageGallery extends Component {

  modal(img) {
    const instance = basicLightbox.create(`
      <div className="overlay">
        <div className="modal">
          <img src=${img} />
        </div>
      </div>
    `);

    function closeModal(e) {
      if (e.key === 'Escape') {
        instance.close();
        window.removeEventListener('keydown', closeModal);
      }
    }

    instance.show();
    window.addEventListener('keydown', closeModal);
    //
  }

  render() {
    const { showImages } = this.props;
    return (
      <ul className="gallery">
        {showImages.map(showImage => (
          <li key={showImage.id} className="galleryItem">
            <img
              src={showImage.webformatURL}
              alt={showImage.id}
              className="galleryItem-image"
              onClick={() => this.modal(showImage.largeImageURL)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
