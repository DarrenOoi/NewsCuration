const Input = ({ setText, placeholder }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      onChange={(event) => setText(event.target.value)}
      className='input input-bordered bg-white text-black rounded-full'
      style={{ width: '925px' }}
    />
  );
};

export default Input;
