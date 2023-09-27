import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import JustTheFactsLine from '@/components/JustTheFactsLine';

function ProfileSearch() {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState('');

  const router = useRouter();
  // const handleBrowse = () => {
  //   router.push({
  //     pathname: '/profilePage',
  //     query: { name: 'John Doe' },
  //   });
  // };

  const handleSearch = () => {
    if (search.trim() != '') {
      setSubmitted(true);
      setResult(null);
    } else setResult(null);
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
              <div className='flex justify-end p mt-5 mr-10 font-bold text-2xl text-[#7895B1]'>
                PROFILE SEARCH
              </div>
              <div className='flex'>
                <div className='flex items-center justify-center mr-1'>
                  <JustTheFactsLine />
                </div>

                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px' }}
                >
                  <div className='flex justify-start justify-center space-x-4 mt-2'>
                    <Input
                      setText={setSearch}
                      placeholder='Enter political profile name'
                    />
                    <Button
                      text='CLICK FOR THE'
                      boldText='FACTS'
                      handleClick={handleSearch}
                    />
                  </div>

                  {/* recents and most popular only shows when no search is submitted  */}
                  {/* make a component for this  */}
                  {submitted ? (
                    <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-8 justify-start'>
                      <div>
                        <p className='text-amber-400 font-bold mb-2'>
                          Search Results
                        </p>
                        <div className='flex'>
                          <p> flag </p>
                          <p className='mb-2'>John Mayer</p>
                        </div>
                        <p className='mb-2'>Yash Man Yea Dude</p>
                        <p className='mb-2'>Minav Tribedi</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-8 justify-start'>
                        <div>
                          <p className='text-amber-400 font-bold mb-2'>
                            RECENTS
                          </p>
                          <div className='flex'>
                            <p> flag </p>
                            <p className='mb-2'>John Mayer</p>
                          </div>
                          <p className='mb-2'>Yash Man Yea Dude</p>
                          <p className='mb-2'>Minav Tribedi</p>
                        </div>
                      </div>
                      <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-2 justify-start'>
                        <div>
                          <p className='text-amber-400 font-bold mb-2'>
                            MOST POPULAR
                          </p>
                          <div className='flex'>
                            <p> flag </p>
                            <p className='mb-2'>John Mayer</p>
                          </div>
                          <p className='mb-2'>Yash Man Yea Dude</p>
                          <p className='mb-2'>Minav Tribedi</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSearch;
