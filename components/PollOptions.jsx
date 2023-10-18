import React, { useState } from 'react';

/**
 * PollOption is a component representing an option in a poll
 *
 * @component
 * @param {string} text - Text for a poll option
 * @param {number} votes - The number of votes for this option.
 * @param {boolean} isClicked - Indicates if the option is selected.
 * @param {Function} onClick - A function to handle the option click.
 * @param {boolean} showVotes - Indicates whether to display the vote count.
 * @returns {JSX.Element} A React JSX element representing the poll option.
 */
const PollOption = ({ text, votes, isClicked, onClick, showVotes }) => {
  return (
    <div className='flex flex-row space-x-4 items-center'>
      <button
        className={
          isClicked == false
            ? 'border border-black rounded-full'
            : 'border border-[#FFB039] rounded-full bg-[#ffd28e]'
        }
        style={{ height: '15px', width: '15px' }}
        onClick={onClick}
        disabled={isClicked}
      ></button>
      <div
        className={
          isClicked == false
            ? 'border border-black rounded-lg p-2'
            : 'border border-[#FFB039]  rounded-lg p-2 bg-[#ffd28e]'
        }
      >
        <p
          className='text-black text-md font-normal'
          style={{ width: '950px' }}
        >
          {text}
        </p>
        {showVotes && (
          <p className='text-black text-xs font-normal'>{votes} Votes</p>
        )}
      </div>
    </div>
  );
};

export default PollOption;
