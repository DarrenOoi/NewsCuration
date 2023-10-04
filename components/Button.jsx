const Button = ({ handleClick, text, boldText }) => {
  return (
    <div className=''>
      <button
        className='btn btn-active btn-neutral text-white font-bold rounded-full'
        type='submit'
        onClick={handleClick}
      >
        {text}
        {boldText ? (
          <text className='text-amber-400 font-extrabold'>{boldText}</text>
        ) : null}
      </button>
    </div>
  );
};

export default Button;
