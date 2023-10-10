import Image from 'next/image';
import Pic from "./pic.png"
import Clipboard from "./clipboard.png"

const Card = ({ title, content, highlight = false, biasWords }) => {
  let phrases = [];
  let keys = [];
  if (highlight && content && biasWords) {
    keys = Object.keys(biasWords);
    phrases = content.split(new RegExp(`(${keys.join('|')})`, 'gi'));
  }

  const copy = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className='card bg-white shadow-xl flex flex-col'>

      <div className="bg-[#f3f3f3] rounded-2xl p-4 flex flex-col space-y-3">
          <div className="p ml-4 text-xs font-bold text-[#FFB039]">PERSONS OF INTEREST IN ARTICLE</div>
          <div className="ml-6 flex flex-row space-x-3 items-center">
            <Image
              src={Pic}
              width={18}
              height={18}
            />

            <p className="text-xs font-bold text-black">FIRSTNAME LASTNAME</p>

            <button className="btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold text-xs">
              VIST PROFILE
            </button>
          </div>
        </div>

      <div className='card-body text-black'>
        <div className='p'>
          <div className='card-title flex justify-center font-bold text-4xl text-gray-600'>
            {title}
          </div>
          {highlight && biasWords ? (
            phrases.map((phrase, index) => {
              const matches = keys.find(
                (key) => phrase.toLowerCase() === key.toLowerCase()
              );

              const isHighlighted = !!matches;
              const phraseKey = `${phrase}-${index}`;
              return isHighlighted ? (
                <div
                  className='tooltip tooltip-bottom'
                  data-tip={biasWords[phrase]}
                >
                  <span key={phraseKey} className='bg-red-300'>
                    {phrase}{' '}
                  </span>
                </div>
              ) : (
                <span key={phraseKey}>{phrase} </span>
              );
            })
          ) : (
            <>{content}</>
          )}
        </div>
        
        <div>
          <button onClick={copy} className="mt-6 btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold">
          <Image
              src={Clipboard}
              width={13}
              height={13}
            />
            COPY TO CLIPBOARD
          </button>
        </div>

      </div>
    </div>
  );
};

export default Card;
