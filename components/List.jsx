import { BsPersonCircle } from 'react-icons/bs';
import { GrArticle } from 'react-icons/gr';
import { findFlagUrlByIso2Code } from 'country-flags-svg';

/**
 * List is a resuable componenet to display a list of articles
 *
 * @component
 * @param {string} title - The title of the list.
 * @param {Array} items - An array of items to display in the list.
 * @param {boolean} politician - Indicates if the items represent politicians.
 * @param {function} handleClick - A function to handle item clicks.
 * @param {boolean} popular - Indicates if the list is for popular items.
 * @param {boolean} campaign - Indicates if the list is for political campaigns.
 * @returns {JSX.Element} A React JSX element representing the list.
 */
const List = ({ title, items, politician, handleClick, popular, campaign }) => {
  // console.log('this items', items);

  // Check if the list is empty
  const isEmpty = items.length === 0;

  return (
    <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-2 justify-start'>
      <div>
        <p className='text-amber-400 font-bold mb-2'>{title}</p>
        {isEmpty ? (
          <p>No {title}</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className='flex mb-2'>
              {politician ? (
                <div className='flex mb-2'>
                  <BsPersonCircle className='align-bottom mr-4' size={25} />
                  <p
                    className='mr-4 cursor-pointer hover:bg-blue-100 rounded-l focus:outline-none'
                    onClick={() => handleClick(`${item.Fname} ${item.Lname}`)}
                  >
                    {item.Fname} {item.Lname}
                  </p>
                  <img
                    // src={findFlagUrlByIso2Code(item.countryCode)}
                    src={findFlagUrlByIso2Code('AU')}
                    className='opacity-70 mt-1'
                    style={{ width: '25px', height: '20px' }}
                  />
                </div>
              ) : campaign ? (
                <div className='flex mb-2'>
                  <BsPersonCircle className='align-bottom mr-4' size={25} />
                  <p
                    className='mr-4 cursor-pointer hover:bg-blue-100 rounded-l focus:outline-none'
                    onClick={() =>
                      handleClick(
                        `${item.Fname} ${item.Lname}`,
                        item.ID,
                        item.About,
                        item.ImageLink,
                        item.Political_Position
                      )
                    }
                  >
                    {item.Fname} {item.Lname}
                  </p>
                  <img
                    src={findFlagUrlByIso2Code('AU')}
                    className='opacity-70 mt-1'
                    style={{ width: '25px', height: '20px' }}
                  />
                </div>
              ) : (
                <div className='flex mb-2'>
                  <GrArticle className='align-bottom mr-4' size={25} />
                  <p
                    className='mr-4 cursor-pointer hover:bg-blue-100 rounded-l focus:outline-none'
                    onClick={() => handleClick(popular ? item.URL : item.url)}
                  >
                    {item.Header}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
