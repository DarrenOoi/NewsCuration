import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchResults } from '@/utils/fetchResults';

function Curation() {
  const router = useRouter();
  const prompt = 'Example GPT prompt :';
  const text = prompt + router.query.text;
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchResults(text).then((result) => setResult(result));
  }, [text]);

  return (
    <div className='bg-gray-100 flex flex-col items-center'>
      <Head>
        <title>News Curation</title>
      </Head>
      <h1>{result}</h1>
    </div>
  );
}

export default Curation;
