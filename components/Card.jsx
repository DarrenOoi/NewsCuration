const Card = ({ title, content, highlight }) => {
  let words = [];
  let biasWords = [];
  if (highlight) {
    words = content.split(' ');
    biasWords = ['sit', 'ipsum', 'vivamus', 'duis'];
  }
  return (
    <div className='card lg:card-side bg-white shadow-xl'>
      <div className='card-body'>

        {/* <div className='card-title flex justify-center font-bold text-4xl text-gray-600'>
          {title}
        </div> */}
        <p className='text-black'>
          {highlight ? (
            words.map((word, index) => {
              const isHighlighted = biasWords.includes(word.toLowerCase());

              return (
                <span key={index} className={isHighlighted ? 'bg-red-300' : ''}>
                  {word}{' '}
                </span>
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
