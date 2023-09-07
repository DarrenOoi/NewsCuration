import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import BiasScore from '@/components/BiasScore';
import { useEffect, useState } from 'react';
import { fetchScore } from '@/utils/fetchScore';

function AnalysisPage() {
  const router = useRouter();
  const { header, text } = router.query;
  const [score, setScore] = useState(null);

  const handleClick = () => {
    router.push('/articleSearch');

  };
  const highlight = true;

  useEffect(() => {
    async function fetchData() {
      if (text) {
        try {
          const res = await fetchScore(text);
          setScore(res * 100.0 + '%');
        } catch (error) {
          console.log('error');
        }
      }
    }
    fetchData();
  }, [text]);

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
              <div className="p mt-5 ml-4 font-bold text-4xl text-[#7895B1]">BIAS ARTICLE BREAKDOWN</div>
              <div className='bg-[#7895B1] rounded-xl' style={{ width: '1200px'}}>
                <button onClick={handleClick} className="font-semibold mt-4 ml-4 btn btn-sm rounded-full btn-neutral text-white">
                  <text>BACK TO <text className="text-[#FFB039] font-bold">ARTICLE SEARCH</text></text>
                </button>
                <div className='mt-4'>
                  <Card
                    title={header}
                    highlight={highlight}
                    content={text}
                  />
                </div>
              </div>
            <BiasScore score={score} />
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}

export default AnalysisPage;
