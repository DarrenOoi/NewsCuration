/**
 * Button is a component designed to be reused
 *
 * @component
 * @param {function} handleClick - The function to be called when the button is clicked
 * @param {string} text - The text displayed on the button
 * @param {string} boldText - (Optional) The bold text displayed on the button
 * @returns {JSX.Element} A React JSX element representing a reusable button
 */
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
