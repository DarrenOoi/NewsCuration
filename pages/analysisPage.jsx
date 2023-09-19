import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import BiasScore from '@/components/BiasScore';
import { useEffect, useState } from 'react';
import { fetchScore } from '@/utils/fetchScore';
import { fetchBiasWords } from '@/utils/fetchBiasWords';
import Image from 'next/image';
import tts from "@/components/tts.png"
import textSize from "@/components/textSize.png"
import profilePicSmall from '@/components/profilePicSmall.png'


function AnalysisPage() {
  const router = useRouter();
  const { header, text } = router.query;
  const [score, setScore] = useState(null);
  const [biasWords, setBiasWords] = useState(null);

  const handleClick = () => {
    router.push('/articleSearch');
  };
  const highlight = true;

  useEffect(() => {
    async function fetchData() {
      if (text) {
        try {
          const res = await fetchScore(text);
          setScore(res * 100.0 + '%');

          const words = await fetchBiasWords(text);
          setBiasWords(words);
        } catch (error) {
          console.log('error');
        }
      }
    }
    fetchData();
  }, [text]);

  const politcalProfile = () => {
    router.push('/profileSearch');
  };

  const ProfileLine = ({text}) => {

    return (
      <div className='flex flex-row items-center justify-center h-6'>
        <div className="mr-1" style={{ display: "flex", alignItems: "center", width: "70px"}}>
          <div style={{ flex: 1, backgroundColor: "#7895B1", height: "2px" }} />
        </div>
        <span className=' text-[#7895B1] text-xs font-bold'>POLITCAL PROFILES</span>
        <div className="ml-1" style={{ display: "flex", alignItems: "center", width: "70px"}}>
          <div style={{ flex: 1, backgroundColor: "#7895B1", height: "2px" }} />
        </div>
      </div>
    )
  }

  const TheBiasLine = ({text}) => {

    return (
      <div className='flex flex-col items-center justify-center w-6'>
        <div style={{ display: "flex", alignItems: "center", width: "2px"}}>
          <div style={{ flex: 1, backgroundColor: "#e53e3e", height: "90px" }} />
        </div>
        <span className='-rotate-90 text-[#e53e3e] text-xs font-bold w-20 mt-2'>THE BIAS</span>
        <div className="mt-9" style={{ display: "flex", alignItems: "center", width: "2px"}}>
          <div style={{ flex: 1, backgroundColor: "#e53e3e", height: "90px" }} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Navbar />
      <div className='min-h-screen bg-[#5F7A95]'>
        <div className='hero'>
          <div className='hero-content p'>
            <div>
              
            <div className="flex items-end justify-between">
                <span className=' mt-5 ml-10 font-bold text-5xl text-[#7895B1] h-11'>
                  BIAS ARTICLE BREAKDOWN
                </span>

                <div className="flex flex-col mr-10">
                    <div className='flex items-center justify-center '>
                      <ProfileLine/>
                    </div>
                  <button className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-lg rounded-b-none' style={{ width: '285px', height: "35px"}}>
                    <Image
                      src={profilePicSmall}
                      width={18}
                      height={18}
                    />
                    <text className='text-white text-sm' onClick={politcalProfile}>CLICK HERE FOR PROFILE SEARCH</text>
                  </button>
                </div>
              </div>

              <div className="flex">

                <div className='flex items-center justify-center'>
                  <TheBiasLine/>
                </div>

                <div
                  className='bg-[#7895B1] rounded-xl p-4'
                  style={{ width: '1200px' }}
                >
                  
                  <div>
                    <button className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-full' style={{ width: '225px', height: "45px"}}>
                      <text className='text-white text-base' onClick={handleClick}>BACK TO THE  
                      <span className='text-[#FFB039] font-extrabold'> FACTS</span></text>
                    </button>

                  <div className="flex flex-row mt-4">
                      <div className="card bg-[#2E2E2E] rounded-full p-0 flex justify-center" style={{ width: '415px', height: "33px"}}>
                        <Image
                          className="ml-3"
                          src={textSize}
                          width={20}
                          height={5}
                          alt="Text To Speech"
                        />
                      </div>
                      <button className="btn btn-sm  btn-neutral bg-[#2E2E2E] rounded-full p-0 ml-4" style={{ width: '50px', height: "33px"}}>
                        <Image
                          src={tts}
                          width={20}
                          height={5}
                          alt="Text To Speech"
                        />
                      </button>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <Card
                      title={header}
                      highlight={highlight}
                      content={
                        biasWords ? (
                          text
                        ) : (
                          <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
                        )
                      }
                      biasWords={biasWords}
                    />
                  </div>
                </div>
              </div>

              <BiasScore className="ml-" score={score} />

              {/* <div>
                <div className='stats shadow rounded-b-none ml-4 mt-10'>
                  <div className='stat bg-gray-800'>
                    <div className='stat-title text-center font-bold text-white'>
                      SUMMARY OF ARTICLE BIAS
                    </div>
                  </div>
                </div>
              </div> */}
              {/* 
              <div
                  className='card bg-white rounded-xl p-7'
                  style={{ width: '1200px'}}
                >
                <text className="text-black"> IDK IF WE STILL DOING THIS </text>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps({ query }) {
//   const { header, text } = query;

//   if (!text) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const score = await fetchScore(text);
//     const biasWords = await fetchBiasWords(text);

//     return {
//       props: {
//         header,
//         text,
//         score: score * 100 + '%',
//         biasWords,
//       },
//       console,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         header,
//         text,
//         score: null,
//         biasWords: null,
//       },
//     };
//   }
// }

export default AnalysisPage;
