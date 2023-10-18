
/**
 * Input is a component designed to be reused
 *
 * @component
 * @param {function} setText - A function to handle text input changes.
 * @param {string} placeholder - The placeholder text for the input field.
 * @returns {JSX.Element} A React JSX element representing the text input field.
 */
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
