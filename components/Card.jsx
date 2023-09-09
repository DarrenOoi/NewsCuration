const Card = ({ title, content, highlight = false, biasWords }) => {
  let phrases = [];
  let keys = [];
  if (highlight && content && biasWords) {
    keys = Object.keys(biasWords);
    phrases = content.split(new RegExp(`(${keys.join('|')})`, 'gi'));
  }
  return (
    <div className='card lg:card-side bg-white shadow-xl'>
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
      </div>
    </div>
  );
};

export default Card;
