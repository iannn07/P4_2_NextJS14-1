'use client';

import { SearchBrandProps } from '@/types';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { brands } from '@/constants/index';

const SearchBrand = ({
  brand,
  setBrand,
}: SearchBrandProps) => {
  const [query, setQuery] = useState('');

  const filteredBrands =
    query === ''
      ? brands
      : brands.filter((item) => {
          return item
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''));
        });

  return (
    <div className='search-manufacturer'>
      <Combobox value={brand} onChange={setBrand}>
        <div className='relative w-full'>
          <Combobox.Button className={'absolute top-[14px]'}>
            <Image
              src={'/car-logo.svg'}
              width={20}
              height={20}
              className='ml-4'
              alt='Car Logo'
            />
          </Combobox.Button>

          <Combobox.Input
            className='search-manufacturer__input'
            placeholder='Hyundai'
            displayValue={(brand: string) => brand}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredBrands.length === 0 && query !== '' ? (
                <Combobox.Option
                  value={query}
                  className='search-manufacturer__option'
                >
                  Nothing Found.
                </Combobox.Option>
              ) : (
                filteredBrands.map((brand: string) => (
                  <Combobox.Option
                    key={brand}
                    value={brand}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? 'bg-primary-blue text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {brand}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? 'text-white'
                                : 'text-pribg-primary-purple'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBrand;
