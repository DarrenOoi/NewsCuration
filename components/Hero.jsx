import { BsImage } from 'react-icons/bs';
import InputField from './InputField';
import Card from './Card';

const Hero = ({ handleSubmit, setText, content }) => {
  return (
    <div className='hero min-h-screen bg-gray-400 mt-2'>
      <div className='hero-content'>
        <div>
          <div className='flex justify-between'>
            <InputField handleSubmit={handleSubmit} setText={setText} />
            <button className='btn btn-active btn-square btn-neutral ml-20'>
              <BsImage />
            </button>
          </div>
          <Card content={content} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
