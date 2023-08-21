import { BsImage } from 'react-icons/bs';
import InputField from './InputField';
import Card from './Card';
import BiasScore from './BiasScore'
import React, { useState } from 'react';

const Hero = ({ handleSubmit, setText, content, score}) => {

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
          <div>
            <Card content={content} />
          </div>
          <div>
            <BiasScore score="60%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
