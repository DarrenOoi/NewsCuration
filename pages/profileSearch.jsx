import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import List from '@/components/List';

function ProfileSearch() {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState('');

  const router = useRouter();
  const array = [
    {
      name: 'Minav Tribedi',
      countryCode: 'AU',
    },
    {
      name: 'Yash Shwarma',
      countryCode: 'AU',
    },
    {
      name: 'Sean Mariokart',
      countryCode: 'AU',
    },
    {
      name: 'Ron Atsley',
      countryCode: 'AU',
    },
    {
      name: 'Daniel Darren',
      countryCode: 'AU',
    },
  ];

  const handleSearch = () => {
    if (search.trim() != '') {
      setSubmitted(true);
      setResult(null);
      router.push({
        pathname: '/profilePage',
        query: { name: 'John Doe' },
      });
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
                  //check if length is suitable for search results
                  style={{ width: '1200px', height: '600px' }}
                >
                  <div className='flex justify-center space-x-4 mt-2'>
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
                  {submitted ? (
                    <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-8 justify-start'>
                      <p>submitted</p>
                    </div>
                  ) : (
                    <div className='mt-6'>
                      <List title={'RECENTS'} items={array} politician={true} />
                      <List
                        title={'MOST POPULAR'}
                        items={array}
                        politician={true}
                      />
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
