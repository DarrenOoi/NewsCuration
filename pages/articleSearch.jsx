import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tts from '@/components/pictures/tts.png';
import textSize from '@/components/pictures/textSize.png';
import profilePicSmall from '@/components/pictures/profilePicSmall.png';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import List from '@/components/List';
import { fetchRecentArticles } from '@/utils/fetchRecentArticles';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [header, setHeader] = useState(null);
  const [article, setArticle] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetchRecentArticles();
        setRecents(res);
        console.log(res);
      } catch (error) {
        //add error handling when request fails
        console.log('error');
      }
    }
    fetchArticles();
  }, []);

  const array = [
    // {
    //   Header: 'Yo Minav Sleep Well Love',
    //   url: 'https://www.skynews.com.au/opinion/chris-kenny/donald-trump-debating-meghan-markle-would-revive-her-flatlining-career/video/f6f265b6eef36342284b84f02bf59abe',
    // },
    // {
    //   Header: 'Yo Dude What Why How',
    // },
    // {
    //   Header: 'OMG This Guy',
    // },
  ];

  const handleListClick = (url) => {
    setSubmitted(true);
    setText(url);
    setResult(null);
    fetchResults(url).then((result) => {
      setResult(result.response);
      setHeader(result.header);
      setArticle(result.article);
      setSubmitted(false);
    });
  };

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
      query: { header: header, text: article, url: text },
    });
  };

  const politcalProfile = () => {
    router.push('/profileSearch');
  };

  const ProfileLine = ({ text }) => {
    return (
      <div className='flex flex-row items-center justify-center h-6'>
        <div
          className='mr-1'
          style={{ display: 'flex', alignItems: 'center', width: '70px' }}
        >
          <div style={{ flex: 1, backgroundColor: '#7895B1', height: '2px' }} />
        </div>
        <span className=' text-[#7895B1] text-xs font-bold'>
          POLITCAL PROFILES
        </span>
        <div
          className='ml-1'
          style={{ display: 'flex', alignItems: 'center', width: '70px' }}
        >
          <div style={{ flex: 1, backgroundColor: '#7895B1', height: '2px' }} />
        </div>
      </div>
    );
  };

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
              <div className='flex items-end justify-between'>
                <span className=' mt-5 ml-10 font-bold text-5xl text-[#7895B1] h-11'>
                  ARTICLE SEARCH
                </span>
                <div className='flex flex-col mr-10'>
                  <div className='flex items-center justify-center '>
                    <ProfileLine />
                  </div>
                  <button
                    className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-lg rounded-b-none'
                    style={{ width: '285px', height: '35px' }}
                  >
                    <Image src={profilePicSmall} width={18} height={18} />
                    <text
                      className='text-white text-sm'
                      onClick={politcalProfile}
                    >
                      CLICK HERE FOR PROFILE SEARCH
                    </text>
                  </button>
                </div>
              </div>

              <div className='flex'>
                <div className='flex items-center justify-center mr-1'>
                  <JustTheFactsLine />
                </div>

                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px' }}
                >
                  <div className='flex justify-center space-x-4 mt-2'>
                    <Input setText={setText} placeholder='Enter article URL' />{' '}
                    <Button
                      text='CLICK FOR THE'
                      boldText='FACTS'
                      handleClick={handleSubmit}
                    />
                  </div>

                  <div className='flex flex-row mt-5'>
                    <div
                      className='card bg-[#2E2E2E] rounded-full p-0 flex justify-center ml-5'
                      style={{ width: '415px', height: '33px' }}
                    >
                      <Image
                        className='ml-3'
                        src={textSize}
                        width={20}
                        height={5}
                        alt='Text To Speech'
                      />
                    </div>
                    <button
                      className='btn btn-sm  btn-neutral bg-[#2E2E2E] rounded-full p-0 ml-4'
                      style={{ width: '50px', height: '33px' }}
                    >
                      <Image
                        src={tts}
                        width={20}
                        height={5}
                        alt='Text To Speech'
                      />
                    </button>
                  </div>

                  <div className='mt-5'>
                    {result ? (
                      <Card content={result} />
                    ) : submitted ? (
                      <Card
                        content={
                          <span className='mt-2 loading loading-spinner loading-lg text-info'></span>
                        }
                      />
                    ) : (
                      <div className='mt-6'>
                        <List
                          title={'RECENTS'}
                          items={recents}
                          handleClick={handleListClick}
                        />
                        <List title={'MOST POPULAR'} items={array} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex justify-center mt-10'>
                {result && header && article && (
                  <div>
                    <button
                      className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-full'
                      style={{ width: '225px', height: '45px' }}
                    >
                      <text
                        className='text-white text-base'
                        onClick={handleClick}
                      >
                        CLICK FOR THE
                        <span className='text-[#FFB039] font-extrabold'>
                          {' '}
                          WHY
                        </span>
                      </text>
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
