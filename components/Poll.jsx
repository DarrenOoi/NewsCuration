import PollOption from "./PollOptions";
import Comment from "./Comment";

const Poll = () => {
    return (
        <div className="flex justify-center">
            <div className='mt-20 card bg-white p-6 rounded-xl'
                style={{width: "1100px"}}>
                
                <div className="flex flex-col">
                    <p className="text-[#FFB039] font-bold">POLL</p>
                    <p className="text-black text-xl font-semibold" >This is the poll question?</p>
                </div>

                <div className="mt-5 ml-5 flex flex-col space-y-3">
                    <PollOption text={"This is the first option"} />
                    <PollOption text={"This is the second option"} />
                    <PollOption text={"This is the third option"} />
                    <PollOption text={"This is the fourth option"} />
                </div>

                <div className="mt-7">
                    <p className="text-black text-md font-semibold">Comments</p>
                    <Comment />
                </div>

            </div>
        </div>
    );
};

export default Poll;