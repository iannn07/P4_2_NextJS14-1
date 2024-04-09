'use client';

import { CarProps } from '@/types';
import { generateCarImageURL } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';

interface CardDetailsProps {
  isToggle: boolean;
  car: CarProps;
  handleClose: () => void;
}

const CardDetails = ({ isToggle, car, handleClose }: CardDetailsProps) => {
  return (
    <>
      <Transition appear show={isToggle} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  >
                    <Image
                      src='/close.svg'
                      alt='Close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  {/* Car Photo */}
                  <div className='flex-1 flex flex-col gap-3'>
                    <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg overflow-hidden'>
                      <Image
                        src={generateCarImageURL(car, '01')}
                        alt='car model'
                        fill
                        priority
                        className='object-contain'
                      />
                    </div>

                    {/* Car Photos Details */}
                    <div className='flex gap-3'>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image
                          src={generateCarImageURL(car, '29')}
                          alt='car model'
                          fill
                          priority
                          className='object-contain'
                        />
                      </div>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image
                          src={generateCarImageURL(car, '33')}
                          alt='car model'
                          fill
                          priority
                          className='object-contain'
                        />
                      </div>
                      <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                        <Image
                          src={generateCarImageURL(car, '13')}
                          alt='car model'
                          fill
                          priority
                          className='object-contain'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Car Information */}
                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold text-xl capitalize'>
                      {car.make} {car.model} ({car.year})
                    </h2>

                    <div className='mt-3 flex flex-col gap-6'>
                      {Object.entries(car).map(([key, value]) => (
                        <div className='flex justify-between gap-5' key={key}>
                          <h4 className='text-gray-400 capitalize'>
                            {key.split('_').join(' ')}
                          </h4>
                          <p className='text-black-100 font-semibold capitalize'>
                            {key === 'drive' ||
                            key === 'make' ||
                            key === 'model'
                              ? value.toUpperCase()
                              : value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardDetails;
