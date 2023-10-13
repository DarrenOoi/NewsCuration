import Image from 'next/image';
import Pic from "./pictures/pic.png"

const PersonOfInterest = ({figureName}) => {
    return (
    <div className="bg-[#f3f3f3] rounded-2xl p-4 flex flex-col space-y-3 mt-5">
        <div className="p ml-4 text-xs font-bold text-[#FFB039]">PERSONS OF INTEREST IN ARTICLE</div>
            <div className="ml-6 flex flex-row space-x-3 items-center">
                <Image
                    src={Pic}
                    width={18}
                    height={18}
                />

      <p className="text-xs font-bold text-black">{figureName}</p>

      <button className="btn btn-xs btn-neutral bg-[#2E2E2E] rounded-full text-white font-semibold text-xs">
        VISIT PROFILE
      </button>
    </div>
  </div>
  );
};

export default PersonOfInterest;