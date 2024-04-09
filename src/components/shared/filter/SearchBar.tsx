'use client';

import { useState } from 'react';
import SearchBrand from './SearchBrand';
import SearchButton from './SearchButton';
import Image from 'next/image';

const SearchBar = ({ setModel, setBrand }: { setModel: (model: string) => void, setBrand: (brand: string) => void }) => {
  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchBrand === '' && searchModel === '') {
      return alert('Please fill in the search bar');
    }

    setModel(searchModel.toLowerCase());
    setBrand(searchBrand.toLowerCase());
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchBrand selected={searchBrand} setSelected={setSearchBrand} />

        <SearchButton additional='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={20}
          height={20}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder='Palisade'
          className='searchbar__input'
        />

        <SearchButton additional='sm:hidden' />
      </div>
      <SearchButton additional='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
