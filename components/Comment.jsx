import Image from 'next/image';
import Pic from './pictures/pic.png';

/**
 * Comment represents a user's comment with a username and text.
 *
 * @component
 * @param {Object} data - Object containing all the information about a comment
 * @returns {JSX.Element} A React JSX element representing a comment.
 */
const Comment = ({ data }) => {
  return (
    <div className='flex flex-row mt-7 ml-1 items-start'>
      <Image src={Pic} width={30} height={30} />
      <div className='flex flex-col ml-4' style={{ width: '944px' }}>
        <div className='p text-xs font-semibold text-black'>{data.Author}</div>
        <div className='p text-xs font-normal text-black'>{data.Comment}</div>
      </div>
    </div>
  );
};

export default Comment;
