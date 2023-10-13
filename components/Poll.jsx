import PollOption from './PollOptions';
import Comment from './Comment';
import Image from 'next/image';
import Pic from './pictures/pic.png';
import { fetchPoll } from '@/utils/fetchPoll';
import { useState, useEffect } from 'react';

const Poll = ({ url }) => {
  const [poll, setPoll] = useState([]);

  // useEffect(() => {
  //     async function fetchPollInfo() {
  //       try {
  //         const [poll] = await Promise.all([
  //           fetchPoll(url),
  //         ]);

  //         console.log(poll)

  //         setPoll(poll);
  //       } catch (error) {
  //         console.log('Error:', error);
  //       }
  //     }

  //     fetchPollInfo();
  //   }, []);

  return (
    <div className='flex justify-center'>
      <div
        className='mt-20 card bg-white p-6 rounded-xl'
        style={{ width: '1100px' }}
      >
        <div className='flex flex-col'>
          <p className='text-[#FFB039] font-bold'>POLL</p>
          <p className='text-black text-xl font-semibold'>{poll.question}</p>
        </div>

        <div className='mt-5 ml-5 flex flex-col space-y-3'>
          <PollOption text={poll.opinion} />
          <PollOption text={'This is the second option'} />
          <PollOption text={'This is the third option'} />
          <PollOption text={'This is the fourth option'} />
        </div>

        <div className='mt-10'>
          <p className='text-black text-md font-semibold'>Comments</p>
          <div className='flex mt-3 space-x-4 pb-4'>
            <Image src={Pic} width={28} height={28} />
            <div className='flex items-start flex-row space-x-2'>
              <input
                type='text'
                placeholder='Add a comment'
                className='input input-ghost input-sm'
                style={{ height: '28px', width: '887px' }}
              />
              <button className='btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold text-xs'>
                COMMENT
              </button>
            </div>
          </div>
          <Comment
            user={'FIRSTNAME LASTNAME'}
            text={'I am yapping about something'}
          />
          <Comment
            user={'FIRSTNAME LASTNAME'}
            text={'I am yapping about something as well'}
          />
          <Comment
            user={'FIRSTNAME LASTNAME'}
            text={'I am waffling about something'}
          />
          <Comment
            user={'FIRSTNAME LASTNAME'}
            text={'I am waffling about something as well'}
          />
        </div>
      </div>
    </div>
  );
};

export default Poll;
