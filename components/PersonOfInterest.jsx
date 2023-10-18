import Image from 'next/image';
import Pic from './pictures/pic.png';
import { useRouter } from 'next/router';

/**
 * PersonOfInterest is the component that displays information about persons of interest in an article.
 *
 * @component
 * @param {string} figureName - The name of the person of interest in the article.
 * @returns {JSX.Element} A React JSX element for the name of the person of interest in the article.
 */

const PersonOfInterest = ({ figureName }) => {
  const router = useRouter();
  const handleClick = (name) => {
    router.push({
      pathname: '/profilePage',
      query: { name: name },
    });
  };
  return (
    <div className='bg-[#f3f3f3] rounded-2xl p-4 flex flex-col space-y-3 mt-5 mb-3'>
      <div className='p ml-4 text-xs font-bold text-[#FFB039]'>
        PERSONS OF INTEREST IN ARTICLE
      </div>
      <div className='ml-6 flex flex-row space-x-3 items-center'>
        <Image src={Pic} width={18} height={18} />

        {figureName.length === 0 ? (
          <p className='uppercase text-xs font-bold text-black'>
            No political persons of interest found
          </p>
        ) : (
          <div className='ml-6 flex flex-row space-x-3 items-center'>
            {figureName.map((name, index) => (
              <div key={index} className='flex flex-row space-x-3 items-center'>
                <p className='uppercase text-xs font-bold text-black'>{name}</p>
                <button
                  className='btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold text-xs'
                  onClick={() => handleClick(name)}
                >
                  VISIT PROFILE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonOfInterest;
