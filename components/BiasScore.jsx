{
  /* score will be passed into this component, assuming its gonna get calculated somewhere else*/
}
const BiasScore = ({ score }) => {
  return (
    <div>
      <div className='stats shadow rounded-t-none ml-9'>
        <div className='stat bg-[#2E2E2E]'>
          <div className='stat-title text-center text-xl text-white'>
            BIAS SCORE
          </div>
          <div className='text-3xl font-extrabold text-[#FFB039] ml-17 text-center'>
            {score ? (
              score
            ) : (
              <span className='mt-2 loading loading-spinner text-warning'></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasScore;
