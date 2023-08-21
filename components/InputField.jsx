const InputField = ({ handleSubmit, setText }) => {
  return (
    <div className='form-control mr-10 '>
      <div className='input-group'>
        <input
          type='text'
          placeholder='Enter article URL'
          onChange={(event) => setText(event.target.value)}
          className='input input-bordered'
          style={{ width: '800px' }} // Adjust the width as needed
        />

        <button
          className='btn btn-active btn-neutral font-bold'
          type='submit'
          onClick={handleSubmit}
        >
          CLICK FOR THE FACTS
        </button>
      </div>
    </div>
  );
};

export default InputField;
