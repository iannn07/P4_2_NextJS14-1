'use client';

import { useState } from 'react';
import SearchManufacturer from './SearchBrand';

const SearchBar = () => {
  const [brand, setBrand] = useState('');
  const handleSearch = () => {};

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          brand={brand}
          setBrand={setBrand}
        />
      </div>
    </form>
  );
};

export default SearchBar;
