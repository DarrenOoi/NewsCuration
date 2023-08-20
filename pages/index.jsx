import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { fetchResults } from '@/utils/fetchResults';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('Waiting for input...');

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
      <Hero handleSubmit={handleSubmit} setText={setText} content={result} />
    </div>
  );
}

export default Home;
