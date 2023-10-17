const Button = ({ handleClick, text, boldText }) => {
  return (
    <div>
      <button
        className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-full mr-5'
        style={{ height: '45px' }}
        type='submit'
        onClick={handleClick}
      >
        {text}
        {boldText ? (
          <span className='text-[#FFB039] font-extrabold'>{boldText}</span>
        ) : null}
      </button>
    </div>
  );
};

export default Button;
