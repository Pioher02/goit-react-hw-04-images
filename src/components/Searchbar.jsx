import propTypes from 'prop-types';

const Searchbar = ({ searchWord }) => {
  return (
    <header className="searchbar">
      <form className="form" onSubmit={searchWord}>
        <button type="submit" className="button" />
        <input
          className="input"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes ={
  searchWord: propTypes.func.isRequired,
}

export default Searchbar;
