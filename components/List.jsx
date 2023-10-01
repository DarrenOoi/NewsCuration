import { BsPersonCircle } from 'react-icons/bs';
import { GrArticle } from 'react-icons/gr';
import { findFlagUrlByIso2Code } from 'country-flags-svg';

const List = ({ title, items, politician }) => {
  return (
    <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-2 justify-start'>
      <div>
        <p className='text-amber-400 font-bold mb-2'>{title}</p>
        {items.map((item, index) => (
          <div key={index} className='flex mb-2'>
            {politician ? (
              <div key={index} className='flex mb-2'>
                <BsPersonCircle className='align-bottom mr-4' size={25} />
                <p className='mr-4'>{item.name}</p>
                <img
                  src={findFlagUrlByIso2Code(item.countryCode)}
                  className='opacity-70 mt-1'
                  style={{ width: '25px', height: '20px' }}
                />
              </div>
            ) : (
              <div key={index} className='flex mb-2'>
                <GrArticle className='align-bottom mr-4' size={25} />
                <p className='mr-4'>{item.header}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
