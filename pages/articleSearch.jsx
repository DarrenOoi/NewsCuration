import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
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
import VerticleLine from '@/components/JustTheFactsLine';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import Menu from '@/components/Menu';

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
      query: { header: header, text: article, url: text },
    });
  };

  const politcalProfile = () => {
    router.push('/profileSearch');
  };

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Menu currentPage={"article"}/>
      <div className='min-h-screen bg-[#5F7A95]'>
        <div className='hero'>
          <div className='hero-content p'>
            <div>

              <div className='flex flex-row-reverse mr-7'>
                <span className='font-bold text-3xl text-[#7895B1] h-7'>
                  ARTICLE SEARCH
                </span>
              </div>

              <div className='flex'>
                <div className='flex items-center justify-center mr-1'>
                  <JustTheFactsLine />
                </div>

                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px' }}
                >
                  <div className='flex justify-start space-x-4 mt-5'>
                    <Input setText={setText} placeholder='Enter article URL' />{' '}
                    <button
                      className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-full mr-5'
                      style={{ width: '225px', height: '45px' }}
                    >
                      <text
                        className='text-white text-sm'
                        onClick={handleSubmit}
                      >
                        CLICK FOR THE <span className='text-[#FFB039] font-extrabold'>FACTS</span>
                      </text>
                    </button>
                  </div>

                  <div className='flex flex-row mt-5'>
                    <div
                      className='card bg-[#2E2E2E] rounded-full p-0 flex justify-center'
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
