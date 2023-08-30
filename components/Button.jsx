const BackButton = ({handleClick, text}) => {
    return (
        <div className=''>
            <button
            className='btn btn-active btn-neutral font-bold'
            type='submit'
            onClick={handleClick}
            >
                {text}
            </button>
        </div>
    );
}

export default BackButton;