import 'tailwindcss/tailwind.css';
import Head from 'next/head';

function Home() {
  return (
    <div className='bg-gray-100 flex flex-col items-center'>
      <Head>
        <title>News Curation</title>
      </Head>
      <h1>News Curation</h1>
      <br></br>
      <input type='text' name='input'></input>
      <br></br>
      <button type='submit' name='submitButton'>
        Submit
      </button>
      <br></br>
    </div>
  );
}

export default Home;
