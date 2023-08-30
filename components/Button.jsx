const Button = ({handleClick, text}) => {
    return (
        <div className=''>
            <button
            className='btn btn-active btn-neutral text-white font-bold rounded-full'
            type='submit'
            onClick={handleClick}
            >
                {text}
            </button>
        </div>
    );
}

export default Button;