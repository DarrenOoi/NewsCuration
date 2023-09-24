import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/router';

function ProfileSearch() {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState('');

  const router = useRouter();
  const handleBrowse = () => {
    router.push({
      pathname: '/profilePage',
      query: { name: 'John Doe' },
    });
  };

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
              <div className='p mt-5 ml-4 font-bold text-4xl text-[#7895B1]'>
                PROFILE SEARCH
              </div>
              <div
                className='bg-[#7895B1] p-4 rounded-xl'
                style={{ width: '1200px' }}
              >
                <div className='flex justify-start justify-center space-x-4 mt-2'>
                  <Button text='BROWSE' handleClick={handleBrowse} />
                  <Input
                    setText={setSearch}
                    placeholder='Enter Politician Name'
                  />{' '}
                  <Button
                    text='CLICK FOR THE FACTS'
                    handleClick={handleSearch}
                  />
                </div>

                <div className='flex justify-center space-x-20 mt-12 mb-10'>
                  {submitted ? (
                    <div
                      className='card bg-red rounded-3xl'
                      style={{ width: '350px', height: '230px' }}
                    ></div>
                  ) : (
                    <div
                      className='card bg-white rounded-3xl'
                      style={{ width: '350px', height: '230px' }}
                    ></div>
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
