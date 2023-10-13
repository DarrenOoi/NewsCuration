import PollOption from './PollOptions';
import Comment from './Comment';
import Image from 'next/image';
import Pic from './pictures/pic.png';
import React, { useState } from 'react';
import { sendPollOption } from '@/utils/sendPollOption';

const Poll = ({ url, data }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [showVotes, setShowVotes] = useState(false);
    const [poll, setPoll] = useState([]);

    const handleOptionSelect = (index) => {
        if (!buttonsDisabled) {
        setSelectedOption(index);
        setButtonsDisabled(true);
        setShowVotes(true);
        }
    };

    const updateVotes = ({index}) => {
        /**
        sendPollOption(url, index);
        */
    }
  

  return (
    <div className='flex justify-center'>
      <div
        className='mt-3 card bg-white p-6 rounded-xl'
        style={{ width: '1100px' }}
      >
        <div className='flex flex-col'>
          <p className='text-[#FFB039] font-bold'>POLL</p>
          <p className='text-black text-xl font-semibold'>{data.question}</p>
        </div>

        <div className='mt-5 ml-5 flex flex-col space-y-3'>
            {data.results.map((results, index) => (
                <PollOption 
                    key={index} 
                    text={results.opinion} 
                    votes={results.votes}
                    isClicked={index === selectedOption}
                    onClick={() => {handleOptionSelect(index);
                                    updateVotes(index)}}
                    disabled={buttonsDisabled}
                    showVotes={showVotes}
                />
            ))}
        </div>

        <div className='mt-10'>
          <p className='text-black text-md font-semibold'>Comments</p>
          <div className='flex mt-3 space-x-4'>
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
