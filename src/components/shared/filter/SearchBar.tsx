'use client';

import { useState } from 'react';
import SearchManufacturer from './SearchBrand';
import SearchButton from './SearchButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();

  const updateSearchParams = (model: string, brand: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (brand) {
      searchParams.set('brand', brand);
    } else {
      searchParams.delete('brand');
    }

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (brand === '' || model === '') {
      return alert('Please fill in the search bar');
    }

    updateSearchParams(model.toLowerCase(), brand.toLowerCase());
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer brand={brand} setBrand={setBrand} />

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
          value={model}
          onChange={(e) => setModel(e.target.value)}
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
