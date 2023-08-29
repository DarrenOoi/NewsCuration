const BackButton = ({handleClick}) => {
    return (
        <div className=''>
            <button
            className='btn btn-active btn-neutral font-bold'
            type='submit'
            onClick={handleClick}
            >
            BACK TO THE <text className="text-orange-500 font-extrabold">FACTS</text>
            </button>
        </div>
    );
}

export default BackButton;