import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();

  const ArticleSearch = () => {
    router.push('/articleSearch');
  };

  const ProfileSearch = () => {
    router.push('/profileSearch')
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
            <div className="mt"style={{ width: '900px'}}><text className="text-white font-bold text-xl">
                                <text className="text-[#FFB039] font-extrabold">JUST THE FACTS</text> lets you discover unbiased
                            political insights. <text className="text-[#FFB039] font-extrabold">START</text> by either filtering through a 
                            <text className="font-extrabold"> single article</text> or by exploring impartial
                            <text className="font-extrabold"> political profiles</text> containing a collection of articles.</text>
                </div>

              <div className='flex justify-center space-x-20 mt-20'>
                <div
                  className='card bg-[#7895B1] rounded-xl'
                  style={{ width: '300px', height: '200px' }}
                >
                  <button
                    className='btn btn-xs btn-neutral rounded-full mt-40 ml-12'
                    style={{ width: '200px', height: '20px' }}
                    onClick={ArticleSearch}
                  >
                    <text className='text-white'>ARTICLE SEARCH</text>
                  </button>
                </div>
                <div
                  className='card bg-[#7895B1] rounded-xl'
                  style={{ width: '300px', height: '200px' }}
                >
                  <button
                    className='btn btn-xs btn-neutral rounded-full mt-40 ml-12'
                    style={{ width: '200px', height: '20px' }}
                    onClick={ProfileSearch}
                  >
                    <text className='text-white'>PROFILE SEARCH</text>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
