import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import BiasScore from '@/components/BiasScore';
import InputField from '@/components/InputField';
import Card from '@/components/Card';
import Input from '@/components/Input'
import Button from '@/components/Button'
import Slider from '@/components/Slider'
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
      <div className='min-h-screen bg-[#5F7A95]'>
        <div className='hero'> 
          <div className='hero-content p'>
            <div>
              <div className="p mt-5 ml-4 font-bold text-4xl text-[#7895B1]">ARTICLE SEARCH</div>
              <div className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px'}}>
                <div className = "flex justify-start space-x-4">
                  <Input setText={setText} /> <Button className='mr-5' handleClick={handleSubmit} text='Click for the facts'/>
                </div>
        
                {/*
                <button className='btn btn-active btn-circle btn-neutral ml-20'>
                  <BsImage />
                </button>
                */}

              <div className='mt-10'>
                <Card

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
              </div>
              </div>
              <div className='flex justify-center mt-10'>
                {result && <Button text='CLICK FOR THE WHY' handleClick={handleClick}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
