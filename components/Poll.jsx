import PollOption from './PollOptions';
import Comment from './Comment';
import Image from 'next/image';
import Pic from './pictures/pic.png';
import React, { useState } from 'react';
import { sendPollOption } from '@/utils/sendPollOption';

/**
 * Poll is a component that displays a poll with options and comments relating to a specific article.
 *
 * @component
 * @param {string} url - The URL of the associated article
 * @param {object} data - Poll data, including the question and results.
 * @returns {JSX.Element} A React JSX element representing the poll.
 */
const Poll = ({ url, data }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [showVotes, setShowVotes] = useState(false);

     /**
     * Handles the selection of a poll option.
     * @param {number} index - The index of the selected poll option.
     */
    const handleOptionSelect = (index) => {
        if (!buttonsDisabled) {
        setSelectedOption(index);
        // Disables the buttons and shows the votes of all the options when an option is selected
        setButtonsDisabled(true);
        setShowVotes(true);
        }
    };

    /**
     * Updates poll votes
     * @param {number} index - The index of the selected poll option.
     */
    const updateVotes = ({index}) => {
        sendPollOption(url, index);
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
        {data.results ? (
            data.results.map((result, index) => (
              <PollOption 
                key={index} 
                text={result.opinion} 
                votes={result.votes}
                isClicked={index === selectedOption}
                onClick={() => {
                  handleOptionSelect(index);
                  updateVotes(index);
                }}
                disabled={buttonsDisabled}
                showVotes={showVotes}
              />
            ))
          ) : (
            <p>No results available.</p>
          )}
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
            user={'User 1'}
            text={'Hmmm this is quite interesting'}
          />
          <Comment
            user={'User 2'}
            text={'Im not sure I agree with their views'}
          />
        </div>
      </div>
    </div>
  );
};

export default Poll;
