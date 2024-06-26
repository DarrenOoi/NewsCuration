import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { fetchResults } from '@/utils/fetchResults';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tts from '@/components/pictures/tts.png';
import textSize from '@/components/pictures/textSize.png';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import List from '@/components/List';
import { fetchRecentArticles } from '@/utils/fetchRecentArticles';
import { fetchPopularArticles } from '@/utils/fetchPopularArticles';
import Menu from '@/components/Menu';
import Poll from '@/components/Poll';
import PersonOfInterest from '@/components/PersonOfInterest';
import { fetchPoliticalFigureNames } from '@/utils/fetchPoliticalFigureNames';
import { fetchPoll } from '@/utils/fetchPoll';

// ArticleSearch component
function Home() {
  
  // State variables
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [header, setHeader] = useState(null);
  const [article, setArticle] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [recents, setRecents] = useState([]);
  const [popular, setPopular] = useState([]);
  const [figureNames, setFigureNames] = useState([]);
  const [poll, setPoll] = useState([]);

  // Router instance
  const router = useRouter();
  const { url } = router.query;

  // Fetch recent and popular articles when component is loaded
  useEffect(() => {
    async function fetchArticles() {
      try {
        if (url) {
          await handleListClick(url);
          const [recents, popular] = await Promise.all([
            fetchRecentArticles(),
            fetchPopularArticles(4),
          ]);

          setRecents(recents);
          setPopular(popular);
        } else {
          const [recents, popular] = await Promise.all([
            fetchRecentArticles(),
            fetchPopularArticles(4),
          ]);

          setRecents(recents);
          setPopular(popular);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchArticles();
  }, []);

  // Handle click of an article from the list (for exmaple the recents list)
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
    fetchPoliticalFigureNames(url).then((poi) => {
      setFigureNames(poi);
    });
    fetchPoll(url).then((poll) => {
      setPoll(poll);
    });
  };

  // Handle submission of the form
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
      fetchPoliticalFigureNames(text).then((poi) => {
        setFigureNames(poi);
      });
      fetchPoll(text).then((poll) => {
        setPoll(poll);
      });
    } else setResult(null);
  };

  // Handle updates to the poll
  const handlePoll = () => {
    fetchPoll(text).then((poll) => {
      setPoll(poll);
    });
  };

  // Handle "click for the why" button
  const handleClick = () => {
    router.push({
      pathname: '/analysisPage',
      query: { header: header, text: article, url: text },
    });
  };

  // Return the JSX for ArticleSearch
  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Menu currentPage={'article'} handleClick={handleListClick} />
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
                  <div className='flex justify-start space-x-4 mt-4'>
                    <Input setText={setText} placeholder='Enter article URL' />{' '}
                    <button
                      className='btn btn-sm bg-[#2E2E2E] btn-neutral rounded-full mr-5'
                      style={{ width: '225px', height: '45px' }}
                      onClick={handleSubmit}
                    >
                      <text className='text-white text-sm'>
                        CLICK FOR THE{' '}
                        <span className='text-[#FFB039] font-extrabold'>
                          FACTS
                        </span>
                      </text>
                    </button>
                  </div>

                  {result && (
                    <div className='flex flex-row mt-5'>
                      <div
                        className='card bg-[#2E2E2E] rounded-full p-1 flex flex-row items-center'
                        style={{ width: '415px', height: '33px' }}
                      >
                        <Image
                          className='ml-3'
                          src={textSize}
                          width={20}
                          height={5}
                          alt='Text Size'
                        />
                        <progress
                          className='ml-6 progress w-80'
                          value={40}
                          max='100'
                        ></progress>
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
                  )}

                  <div className='mt-3'>
                    {result ? (
                      <div className='pb-5'>
                        <PersonOfInterest figureName={figureNames} />
                        <Card content={result} url={text} />
                        <Poll data={poll} url={text} voteUpdate={handlePoll} />
                      </div>
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
                        <List
                          title={'MOST POPULAR'}
                          items={popular}
                          handleClick={handleListClick}
                          popular={true}
                        />
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
                      onClick={handleClick}
                    >
                      <text className='text-white text-base'>
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
