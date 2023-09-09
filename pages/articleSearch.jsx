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
              <div className='p mt-5 ml-4 font-bold text-4xl text-[#7895B1]'>
                ARTICLE SEARCH
              </div>
              <div
                className='bg-[#7895B1] p-4 rounded-xl'
                style={{ width: '1200px' }}
              >
                <div className='flex justify-start space-x-4'>
                  <Input setText={setText} />{' '}
                  <Button
                    className='mr-5'
                    handleClick={handleSubmit}
                    text='Click for the facts'
                  />
                </div>

                <div className='mt-10'>
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
          </div>
        </div>

        <div className='flex justify-center mt-3 '>
          {result && header && article && (
            <Button
              text='CLICK FOR THE'
              handleClick={handleClick}
              boldText='WHY'
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
