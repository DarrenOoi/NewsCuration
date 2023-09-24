const Input = ({ setText, placeholder }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      onChange={(event) => setText(event.target.value)}
      className='input input-bordered bg-white text-black rounded-full text-sm'
      style={{ width: '700px', height: '45px' }} // Adjust the width as needed
    />
  );
};

export default Input;
