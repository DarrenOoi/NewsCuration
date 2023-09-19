import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [header, setHeader] = useState(null);
  const [article, setArticle] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text.trim() != '') {
      setSubmitted(true);
      setResult(null);
      fetchResults(text).then((result) => {
        setResult(result.response);
        setHeader(result.header);
        setArticle(result.article);
        setSubmitted(false);
      });
    } else setResult(null);
  };
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/analysisPage',
      query: { header: header, text: article },
    });
  };

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

  const ArticleLine = ({text}) => {

    return (
      <div className='flex flex-col items-center justify-center w-6'>
        <div style={{ display: "flex", alignItems: "center", width: "2px"}}>
          <div style={{ flex: 1, backgroundColor: "#FFB039", height: "90px" }} />
        </div>
        <span className='-rotate-90 text-[#FFB039] text-xs font-bold w-20 mt-1'>ARTICLE</span>
        <div className="mt-9" style={{ display: "flex", alignItems: "center", width: "2px"}}>
          <div style={{ flex: 1, backgroundColor: "#FFB039", height: "90px" }} />
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
                  ARTICLE SEARCH
                </span>

                <div className="flex flex-col mr-10">
                    <div className='flex items-center justify-center '>
                      <ProfileLine/>
                    </div>
                  <button className='btn btn-sm btn-neutral rounded-lg rounded-b-none' style={{ width: '285px', height: "35px"}}>
                    <text className='text-white text-sm' onClick={politcalProfile}>CLICK HERE FOR PROFILE SEARCH</text>
                  </button>
                </div>
              </div>

              <div className="flex">

                <div className='flex items-center justify-center'>
                  <ArticleLine text={"ARTICLE"}/>
                </div>

                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px' }}
                >
                  <div className='flex justify-start space-x-4 mt-5'>
                    <Input setText={setText} />{' '}
                    <button className='btn btn-sm btn-neutral rounded-full mr-5' style={{ width: '225px', height: "45px"}}>
                      <text className='text-white text-sm' onClick={handleSubmit}>CLICK FOR THE FACTS</text>
                    </button>
                  </div>

                  <div className="flex flex-row mt-5">
                    <div className="card bg-black rounded-full p-0" style={{ width: '375px', height: "33px"}}>
                      <span>slider goes here</span>
                    </div>
                    <div className="card bg-black rounded-full p-0 ml-5" style={{ width: '45px', height: "33px"}}>
                      <span>tts</span>
                    </div>
                  </div>

                  <div className='mt-5'>
                    <Card
                      content={
                        result ? (
                          result
                        ) : submitted ? (
                          <span className='mt-2 loading loading-spinner loading-lg text-info'></span>
                        ) : (
                          'Waiting for input...'
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-center mt-10'>
                {result && header && article && (
                  <div>
                  <button className='btn btn-sm btn-neutral rounded-full' style={{ width: '225px', height: "45px"}}>
                      <text className='text-white text-base' onClick={handleClick}>CLICK FOR THE  
                      <span className='text-[#FFB039] font-extrabold'> WHY</span></text>
                    </button>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
