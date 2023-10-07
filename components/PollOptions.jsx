const PollOption = ({text, state}) => {
    return (
        <div className="flex flex-row space-x-4 items-center">
            <button className="border border-black rounded-full"style={{height:"15px", width:"15px"}}></button>
            <div className="border border-black rounded-lg p-1">
                <p className="text-black text-md font-normal">{text}</p>
            </div>
        </div>
    );
};

export default PollOption;