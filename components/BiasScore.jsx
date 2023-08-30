{
  /* score will be passed into this component, assuming its gonna get calculated somewhere else*/
}
const BiasScore = ({ handleClick, score}) => {
  return (
    <div>
      <div className='stats shadow rounded-t-none ml-4'>
        <div className='stat bg-gray-800'>
          <div className='stat-title text-center font-bold text-gray-400'>
            ORIGINAL ARTICLE BIAS SCORE
          </div>
          <div className='stat-value text-orange-500 ml-17 text-center'>
            {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasScore;
