'use client';

import { CarProps } from '@/types';
import { calculateRent, generateCarImageURL } from '@/utils';
import Image from 'next/image';
import CustomButton from '../button/CustomButton';
import { useState } from 'react';
import CardDetails from './CardDetails';

interface CardProps {
  car: CarProps;
}

const Card = ({ car }: CardProps) => {
  const { city_mpg, make, model, transmission, drive, year } = car;
  const [isToggle, setIsToggle] = useState(false);

  const carRent = calculateRent(city_mpg, year);

  return (
    <div className='car-card group'>
      {/* Car Basic Information */}
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>
          {make} {model} ({year})
        </h2>
      </div>

      {/* Rent Fee */}
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'>$</span>
        {carRent}
        <span className='self-start text-[14px] font-medium'>/day</span>
      </p>

      {/* Car Image */}
      <div className='relative w-full h-40 my-3 object-contain'>
        <Image
          src={generateCarImageURL(car, '01')}
          alt='hero'
          fill
          className='object-contain'
          priority
        />
      </div>

      {/* Car Advanced Information */}
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-gray'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              src='/steering-wheel.svg'
              width={20}
              height={20}
              alt='steering wheel'
            />
            <p className='text-[14px]'>
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/tire.svg' width={20} height={20} alt='tire' />
            <p className='text-[14px]'>{drive.toUpperCase()}</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/gas.svg' width={20} height={20} alt='city mpg' />
            <p className='text-[14px]'>{city_mpg} MPG</p>
          </div>
        </div>

        <div className='car-card__btn-container'>
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] font-bold leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsToggle(true)}
          />
        </div>
      </div>

      {/* Card Details Modal */}
      <CardDetails
        isToggle={isToggle}
        car={car}
        handleClose={() => setIsToggle(false)}
      />
    </div>
  );
};

export default Card;
