import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { findFlagUrlByCountryName } from 'country-flags-svg';
import { useRouter } from 'next/router';
import { fetchPolitician } from '@/utils/fetchPolitician';
import { useEffect, useState } from 'react';

function ProfilePage() {
  const router = useRouter();
  const { name } = router.query;
  const [politician, setPolitician] = useState(null);

  useEffect(() => {
    async function fetchPoliticianData() {
      if (name) {
        try {
          const res = await fetchPolitician(name);
          setPolitician(res);
          console.log(res);
        } catch (error) {
          console.log('error');
        }
      }
    }
    fetchPoliticianData();
  }, [name]);

  const handleBrowse = () => {};

  const handleSearch = () => {};

  const flagUrl = findFlagUrlByCountryName('United States');
  const array = [
    {
      title: 'Sample Article 1',
      date: '2023-09-13',
      source: 'Sample Source 1',
      score: 69,
    },
    {
      title: 'Sample Article 2',
      date: '2023-09-14',
      source: 'Sample Source 2',
      score: 33,
    },
    {
      title: 'Sample Article 3',
      date: '2023-09-15',
      source: 'Sample Source 3',
      score: 78,
    },
  ];

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

                  <input
                    type='text'
                    placeholder='Enter political profile name'
                    className='input input-bordered bg-white text-black rounded-full'
                    style={{ width: '450px' }}
                  />

                  <Button
                    text='CLICK FOR THE FACTS'
                    handleClick={handleSearch}
                  />
                </div>

                <div className='flex justify-center space-x-20 my-7'>
                  <div className='rounded-lg bg-white m-5'>
                    <div className='hero-content lg:flex-row mx-5 my-3'>
                      <div>
                        <img
                          src={politician.ImageLink}
                          //   src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                          className='max-w-sm rounded-lg mr-5'
                          style={{ width: '200px', height: '250px' }}
                        />
                      </div>
                      <div style={{ width: '700px', height: '250px' }}>
                        <p className='text-2xl font-bold mb-2'>
                          {politician.Fname} {politician.Lname}
                        </p>
                        <p className='text-xs text-gray-400	'>
                          Ut enim ad minim veniam
                        </p>
                        <p className='text-l font-bold my-4'>About</p>
                        <p className='mr-10'>{politician.About}</p>
                      </div>
                      <div>
                        <img
                          src={flagUrl}
                          className='max-w-sm opacity-50'
                          style={{ width: '100px', height: '75px' }}
                        />
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                    {/* Filtered Summary Row */}
                    <div className='mx-10 mb-10'>
                      <p className='text-l font-bold my-4'>FILTERED SUMMARY</p>

                      <p>{politician.Summary}</p>
                    </div>
                    {/* Recent Article Collection Row */}
                    <div className='mx-10 mb-10'>
                      <p className='text-l font-bold py-4'>
                        RECENT ARTICLES COLLECTION
                      </p>

                      <Table articles={array} />
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                    </div>
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

export default ProfilePage;
