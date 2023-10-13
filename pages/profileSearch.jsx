import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Menu from '@/components/Menu';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import List from '@/components/List';
import { fetchRecentPoliticians } from '@/utils/fetchRecentPoliticians';

function ProfileSearch() {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState('');
  const [recents, setRecents] = useState('');

  useEffect(() => {
    async function fetchPoliticians() {
      try {
        const res = await fetchRecentPoliticians();
        setRecents(res);
        console.log(res);
      } catch (error) {
        //add error handling when request fails
        console.log('error');
      }
    }
    fetchPoliticians();
  }, []);

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
        query: { name: 'Donald Trump' },
      });
    } else setResult(null);
  };

  const handleClick = (name) => {
    router.push({
      pathname: '/profilePage',
      query: { name: name },
    });
  };

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Menu currentPage={'profile'} />
      <div className='min-h-screen bg-[#5F7A95]'>
        <div className='hero'>
          <div className='hero-content p'>
            <div>
              <div className='flex flex-row-reverse mr-7'>
                <span className='font-bold text-3xl text-[#7895B1] h-7'>
                  PROFILE SEARCH
                </span>
              </div>
              <div className='flex'>
                <div className='flex items-center justify-center mr-1'>
                  <JustTheFactsLine />
                </div>

                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px' }}
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
                    // <div className='hero-content lg:flex-row bg-white rounded-3xl mx-5 mt-8 justify-start'>
                    //   <p>submitted</p>
                    // </div>
                    <div className='mt-6'>
                      <List
                        title={'RESULTS'}
                        items={recents}
                        politician={true}
                        handleClick={handleClick}
                      />
                    </div>
                  ) : (
                    <div className='mt-6'>
                      <List
                        title={'RECENTS'}
                        items={recents}
                        politician={true}
                        handleClick={handleClick}
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
