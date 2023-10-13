import Image from 'next/image';
import Clipboard from "./pictures/clipboard.png"

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
        
        <div className="flex flex-row items-center mt-6">
          <button onClick={copy} className="btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold">
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
