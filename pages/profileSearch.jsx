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
import { searchPolitician } from '@/utils/searchPolitician';

// ProfileSearch component
function ProfileSearch() {

  // Router instance
  const router = useRouter();
  const { name } = router.query;

  // State variables
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState([]);
  const [recents, setRecents] = useState([]);

  // // Fetch recent politicians and search results when the component loads
  useEffect(() => {
    async function fetchPoliticians() {
      try {
        if (name) {
          setSubmitted(true);
          setResult([]);
          const searchResult = await searchPolitician(name);
          console.log(searchResult);
          setResult(searchResult);
          setSubmitted(false);
          const res = await fetchRecentPoliticians();
          setRecents(res);
        } else {
          const res = await fetchRecentPoliticians();
          setRecents(res);
        }
      } catch (error) {
        //add error handling when request fails
        console.log('error');
      }
    }
    fetchPoliticians();
  }, []);

  // Handle the search button click
  const handleSearch = async () => {
    if (search.trim() != '') {
      setSubmitted(true);
      setResult([]);
      const searchResult = await searchPolitician(search);
      // console.log('this is search', searchResult);
      setResult(searchResult);
      setSubmitted(false);
      // console.log('this is result', result);
    } else setResult([]);
  };

   // Handle the click event on a politician
  const handleClick = (name) => {
    router.push({
      pathname: '/profilePage',
      query: { name: name },
    });
  };

  // Return the JSX for ProfileSearch
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
                  {result.length !== 0 ? (
                    <div className='mt-6'>
                      <List
                        title='RESULTS'
                        items={result}
                        politician={true}
                        handleClick={handleClick}
                      />
                    </div>
                  ) : submitted ? (
                    <div className='flex justify-center'>
                      <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
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
