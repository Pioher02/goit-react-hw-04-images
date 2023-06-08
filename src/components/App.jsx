import { Component } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import './Styles.css';
import { MagnifyingGlass } from 'react-loader-spinner';
import Notiflix from 'notiflix';

const fetchImages = async (search, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=36466872-8cd7f36167ccc00ecda2aa8fc&q=${search}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

let page = 1;

class App extends Component {
  state = {
    images: [],
    loading: false,
  };

  searchWord = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const search = form.elements.search.value;
    page = 1;
    this.setState({ images: [] });
    this.searchImages(search, page);
  };

  loadMore(evt) {
    page = page + 1;
    const search = this.state.images[page].name;
    this.searchImages(search, page);
  }

  searchImages = async (search, page) => {
    this.setState({ loading: true });
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
        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          loading: false,
        }));
      } else {
        if (page === 1) {
          this.setState({ loading: false });
          Notiflix.Notify.failure('Image not found, search again');
        } else {
          this.setState({ loading: false });
          Notiflix.Notify.warning('No more image found');
        }
      }
    } catch (error) {
      Notiflix.Notify.failure(error);
    }
  };

  render() {
    return (
      <div>
        <Searchbar searchWord={this.searchWord} />
        {this.state.loading ? (
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
          <ImageGallery showImages={this.state.images} />
        )}
        <div className="container">
          {this.state.images.length > 0 && (
            <button className="loadMore" onClick={evt => this.loadMore(evt)}>
              Load More
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
