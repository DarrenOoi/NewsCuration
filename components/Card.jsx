const Card = ({ title, content, highlight = false }) => {
  let phrases = [];
  let biasWords = {};
  let keys = [];
  if (highlight) {
    biasWords = {
      'Nulla sed': 'A phrase with no specific meaning',
      'Mauris pretium lacus sapien': 'Describes a certain state or condition',
      'vehicula eget enim vel': 'Related to vehicles and their properties',
      'Nam scelerisque': 'Refers to a specific concept or idea',
    };
    keys = Object.keys(biasWords);
    phrases = content.split(new RegExp(`(${keys.join('|')})`, 'gi'));
  }
  return (
    <div className='card lg:card-side bg-white shadow-xl'>
      <div className='card-body'>
        {/* <div className='card-title flex justify-center font-bold text-4xl text-gray-600'>
          {title}
        </div> */}
        <p className='text-black'>
          {highlight ? (
            phrases.map((phrase, index) => {
              const matches = keys.find(
                (key) => phrase.toLowerCase() === key.toLowerCase()
              );

              const isHighlighted = !!matches;
              const phraseKey = `${phrase}-${index}`;
              return isHighlighted ? (
                <div
                  className='tooltip tooltip-bottom'
                  data-tip={'Bias : ' + biasWords[phrase]}
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
        </p>
      </div>
    </div>
  );
};

export default Card;
