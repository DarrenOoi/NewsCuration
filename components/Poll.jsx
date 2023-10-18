import PollOption from './PollOptions';
import Comment from './Comment';
import Image from 'next/image';
import Pic from './pictures/pic.png';
import { useState, useEffect } from 'react';
import { sendPollOption } from '@/utils/sendPollOption';
import { fetchArticleComments } from '@/utils/fetchArticleComments';
import { sendArticleComment } from '@/utils/sendArticleComment';

/**
 * Poll is a component that displays a poll with options and comments relating to a specific article.
 *
 * @component
 * @param {string} url - The URL of the associated article.
 * @param {object} data - Poll data, including the question and results.
 * @param {function} voteUpdate - Callback function to update votes.
 * @returns {JSX.Element} A React JSX element representing the poll.
 */
const Poll = ({ url, data, voteUpdate}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showVotes, setShowVotes] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const comments = await Promise.all([fetchArticleComments(url)]);
        setComments(comments);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchComments();
  }, []);

  /**
     * Handles the selection of a poll option.
     * @param {number} index - The index of the selected poll option.
     */
  async function handleOptionSelect (index) {
    console.log("this is the index", index)
    if (!buttonsDisabled) {
      await sendPollOption(url, index);
      setSelectedOption(index);
      setButtonsDisabled(true);
      setShowVotes(true);
      voteUpdate();
    }
  };

  /**
     * Handles posting a comment.
     */
  async function postArticleComment() {
    await sendArticleComment("Anonymous", input, url);
    setInput("Add a comment");
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
                onChange={(event) => setInput(event.target.value)}
                style={{ height: '28px', width: '887px' }}
              />
              <button onClick={()=>postArticleComment()} className='btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold text-xs'>
                COMMENT
              </button>
            </div>
          </div>
          
          {comments[0] ? (
            comments[0].map((comment, index) => (
            <Comment key={index} data={comment}/>
          ))
          ) : (
            <p className='mt-7 ml-1 p text-xs font-normal text-black'>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poll;
