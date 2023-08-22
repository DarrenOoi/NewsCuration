import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import BiasScore from '@/components/BiasScore';
import InputField from '@/components/InputField';
import Card from '@/components/Card';
import { BsImage } from 'react-icons/bs';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    // fetchResults(text).then((result) => setResult(result));
    setResult(text);
  };

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Navbar />
      <div className='min-h-screen bg-[#78909c] mt-2'>
        <div className='hero'>
          <div className='hero-content'>
            <div>
              <div className='flex justify-between mt-5'>
                <InputField handleSubmit={handleSubmit} setText={setText} />
                <button className='btn btn-active btn-circle btn-neutral ml-20'>
                  <BsImage />
                </button>
              </div>

              <Card content={result ? result : 'Waiting for input...'} />
              {result && <BiasScore score='60%' />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
