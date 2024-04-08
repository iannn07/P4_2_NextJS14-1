'use client';

import Image from 'next/image';
import CustomButton from './shared/button/CustomButton';

const Hero = () => {
  const handleScroll = () => {
    console.log('clicked');
  };

  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
          Precision, Performance, Ngebul and Stututu!
        </h1>

        <p className='hero__subtitle'>
          Feel the experience of having a well performed car on your feet.
        </p>

        <CustomButton
          title='Explore More'
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>

      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image
            src={'/hero.png'}
            alt='Hero'
            fill={true}
            className='object-contain'
          />
        </div>
        <div className='hero__image-overlay'></div>
      </div>
    </div>
  );
};

export default Hero;
