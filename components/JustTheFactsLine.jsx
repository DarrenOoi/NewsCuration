const JustTheFactsLine = () => {
  return (
    <div className='flex flex-col items-center justify-center w-6'>
      <div style={{ display: 'flex', alignItems: 'center', width: '2px' }}>
        <div style={{ flex: 1, backgroundColor: '#FFB039', height: '150px' }} />
      </div>
      <span className='-rotate-90 text-[#FFB039] text-xs font-bold w-40 mt-2'>
        JUST THE FACTS
      </span>
      <div
        className='mt-20'
        style={{ display: 'flex', alignItems: 'center', width: '2px' }}
      >
        <div style={{ flex: 1, backgroundColor: '#FFB039', height: '350px' }} />
      </div>
    </div>
  );
};

export default JustTheFactsLine;
