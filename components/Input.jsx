const Input = ({ setText }) => {
    return (
        <input
          type='text'
          placeholder='Enter article URL'
          onChange={(event) => setText(event.target.value)}
          className='input input-bordered bg-white text-black rounded-full text-sm'
          style={{ width: '700px', height: "45px" }} // Adjust the width as needed
        />
    )
}

export default Input;