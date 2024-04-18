import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({
  title,
  btnType,
  containerStyles,
  textStyles,
  rightIcon,
  handleClick,
}: CustomButtonProps) => {

  return (
    <button
      type={btnType ? btnType : 'button'}
      disabled={false}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image src={rightIcon} fill className='object-contain' alt='icon' />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
