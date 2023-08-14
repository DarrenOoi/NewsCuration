import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/curation?text=${encodeURIComponent(text)}`);
  };
  return (
    <div className='bg-gray-100 flex flex-col items-center'>
      <Head>
        <title>News Curation</title>
      </Head>
      <h1>News Curation</h1>
      <br></br>
      <input
        type='text'
        onChange={(event) => setText(event.target.value)}
        name='input'
      ></input>
      <br></br>
      <button type='submit' onClick={handleSubmit} name='submitButton'>
        Submit
      </button>
      <br></br>
    </div>
  );
}

export default Home;
