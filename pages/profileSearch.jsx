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
                      setText={handleSearch}
                      placeholder='Enter political profile name'
                    />
                    <Button
                      text='CLICK FOR THE'
                      boldText='FACTS'
                      handleClick={handleSearch}
                    />
                  </div>

                  <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 my-8'>
                    <div className=''></div>
                    {submitted ? (
                      //show cards based on result
                      <div>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                      </div>
                    ) : (
                      <div>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                        <p className='text-2xl font-bold mb-2'>RECENTS</p>
                      </div>
                    )}
                  </div>
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
