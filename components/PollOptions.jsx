const PollOption = ({text, state, votes}) => {
    return (
        /** 
        <div className="flex flex-row space-x-4 items-center">
            <button className="border border-black rounded-full bg-[#e1e1e1]" style={{height:"15px", width:"15px"}}></button>
            <div className="border border-black  rounded-lg p-2 bg-[#e1e1e1]">
                <p className="text-black text-md font-normal" style={{width:"950px"}}>{text}</p>
                <p className="text-black text-xs font-normal" style={{width:"950px"}}>{votes}</p>
            </div>
        </div>
        <div className="flex flex-row space-x-4 items-center">
            <button className="border border-[#FFB039] rounded-full bg-[#ffd28e]" style={{height:"15px", width:"15px"}}></button>
            <div className="border border-[#FFB039]  rounded-lg p-2 bg-[#ffd28e]">
                <p className="text-black text-md font-normal" style={{width:"950px"}}>{text}</p>
                <p className="text-black text-xs font-normal" style={{width:"950px"}}>{votes}</p>
            </div>
        </div>
        */
        <div className="flex flex-row space-x-4 items-center">
            <button className="border border-black rounded-full" style={{height:"15px", width:"15px"}}></button>
            <div className="border border-black rounded-lg p-2">
                <p className="text-black text-md font-normal" style={{width:"950px"}}>{text}</p>
            </div>
        </div>
    );
};

export default PollOption;