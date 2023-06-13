import { MagnifyingGlass } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Notiflix from 'notiflix';
import axios from 'axios';
import './Styles.css';
import { useState } from 'react';

//Obtiene info de la api
const fetchImages = async (search, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=36466872-8cd7f36167ccc00ecda2aa8fc&q=${search}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

let page = 1;

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  //Guarda la palabra del formulario
  const searchWord = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const search = form.elements.search.value;
    page = 1;
    setImages([]);
    searchImages(search, page);
  };

  //Carga más imagenes al dar clic en el boton
  const loadMore = evt => {
    page = page + 1;
    const search = images[page].name;
    searchImages(search, page);
  };

  //Busca las imagenes de acuerdo a la palabra
  const searchImages = async (search, page) => {
    setLoading(true);
    try {
      const request = await fetchImages(search, page);
      const newImages = request.map(function (image) {
        var nImg = {};
        nImg.name = search;
        nImg.id = image.id;
        nImg.largeImageURL = image.largeImageURL;
        nImg.webformatURL = image.webformatURL;
        return nImg;
      });
      if (newImages.length > 0) {
        setImages([...images, ...newImages]);
        setLoading(false);
      } else {
        if (page === 1) {
          setLoading(false);
          Notiflix.Notify.failure('Image not found, search again');
        } else {
          setLoading(false);
          Notiflix.Notify.warning('No more image found');
        }
      }
    } catch (error) {
      Notiflix.Notify.failure(error);
    }
  };

  return (
    <div>
      <Searchbar searchWord={searchWord} />
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      ) : (
        <ImageGallery showImages={images} />
      )}
      <div className="container">
        {images.length > 0 && (
          <button className="loadMore" onClick={evt => loadMore(evt)}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
