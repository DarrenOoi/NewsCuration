import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import BiasScore from '@/components/BiasScore';
import InputField from '@/components/InputField';
import Card from '@/components/Card';
import { BsImage } from 'react-icons/bs';
import AnalysisPage from './analysisPage';
import { useRouter } from 'next/router';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text.trim() != '') {
      setSubmitted(true);
      setResult(null);
      fetchResults(text).then((result) => {
        setResult(result);
        setSubmitted(false);
      });
    } else setResult(null);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('http://localhost:3000/analysisPage');
  };

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Navbar />
      <div className='min-h-screen bg-[#78909c] '>
        <div className='hero'>
          <div className='hero-content'>
            <div>
              <div className='flex justify-between mt-5'>
                <InputField handleSubmit={handleSubmit} setText={setText} />
                <button className='btn btn-active btn-circle btn-neutral ml-20'>
                  <BsImage />
                </button>
              </div>

              <Card
                header='THE FACTS'
                title={
                  result
                    ? result.substring(
                        result.indexOf(':') + 1,
                        result.indexOf('TEXT')
                      )
                    : ''
                }
                content={
                  result ? (
                    result
                  ) : submitted ? (
                    <span className='mt-2 loading loading-spinner text-warning'></span>
                  ) : (
                    'Waiting for input...'
                  )
                }
              />
              {result && <BiasScore score='60%' handleClick={handleClick} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
