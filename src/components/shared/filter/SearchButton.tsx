import Image from 'next/image';

const SearchButton = ({ additional }: { additional: string }) => {
  return (
    <button type='submit' className={`-ml-3 z-10 ${additional}`}>
      <Image
        src='/magnifying-glass.svg'
        alt='magnifying glass'
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  );
};

export default SearchButton;
