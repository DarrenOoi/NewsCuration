import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Menu from '@/components/Menu';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { findFlagUrlByCountryName } from 'country-flags-svg';
import { useRouter } from 'next/router';
import { fetchPolitician } from '@/utils/fetchPolitician';
import { useEffect, useState } from 'react';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import Input from '@/components/Input';
import { fetchCampaign } from '@/utils/fetchCampaign';

function ProfilePage() {
  const router = useRouter();
  const { name } = router.query;
  const [politician, setPolitician] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPoliticianData() {
      if (name) {
        try {
          const res = await fetchPolitician(name);
          console.log(res);
          setPolitician(res);
          if (res.HasCampaign === 1) {
            setCampaign(true);
          }
        } catch (error) {
          //add error handling when request fails
          console.log('error');
        }
      }
    }
    fetchPoliticianData();
  }, [name]);

  const handleSearch = () => {
    router.push({
      pathname: '/profileSearch',
      query: { name: search },
    });
  };

  const flagUrl = findFlagUrlByCountryName('Australia');
  const array = politician?.Articles;

  const handleViewCampaign = () => {
    router.push({
      pathname: '/campaignPage',
      query: {
        id: politician.ID,
        about: politician.About,
        image: politician.ImageLink,
        name: politician.Fname + ' ' + politician.Lname,
        title: politician.Political_Position,
      },
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

                  <div className='flex justify-center space-x-20 my-2'>
                    {politician ? (
                      <div className='rounded-3xl bg-white m-5'>
                        {/* campaign banner  */}
                        {campaign && (
                          <div className='bg-[#FFEDD5] rounded-xl h-12 flex items-center'>
                            <p className='text-xl text-[#FFB039] font-bold ml-8 mr-auto'>
                              ● LIVE
                            </p>

                            <button
                              className={
                                'btn btn-ghost btn-sm text-[#FFB039] text-xs ml-auto mr-5'
                              }
                              onClick={handleViewCampaign}
                            >
                              CLICK TO VIEW CAMPAIGN DETAILS
                            </button>
                          </div>
                        )}
                        <div className='hero-content flex flex-row mx-5 my-3'>
                          <div className='mb-auto'>
                            <img
                              src={politician?.ImageLink}
                              // src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                              className='max-w-sm rounded-lg mr-5'
                              style={{ width: '200px', height: '250px' }}
                            />
                          </div>
                          <div style={{ width: '700px' }}>
                            <p className='text-2xl font-bold mb-2'>
                              {politician?.Fname} {politician?.Lname}
                            </p>
                            {/* <p className='text-2xl font-bold my-2'>John Doe</p> */}
                            <p className='text-xs text-gray-400	'>
                              {politician?.Political_Position}
                            </p>
                            <p className='text-l font-bold my-4'>About</p>
                            {politician ? (
                              <p className='mr-10'>{politician?.About}</p>
                            ) : (
                              <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
                            )}
                            {/* <p className='mr-10'> Ut enim ad minim veniam</p> */}
                          </div>
                          <div className='mb-auto'>
                            <img
                              src={flagUrl}
                              className='max-w-sm opacity-50 mb-12'
                              style={{ width: '100px', height: '75px' }}
                            />
                          </div>
                        </div>
                        {/* orange line */}
                        <div
                          className='ml-auto mr-12'
                          style={{
                            backgroundColor: '#FFB039',
                            height: '3px',
                            width: '200px',
                          }}
                        />
                        {/* Filtered Summary Row */}
                        <div className='mx-10 mb-10'>
                          <p className='text-l font-bold my-4'>
                            FILTERED SUMMARY
                          </p>
                          {politician ? (
                            <p>{politician?.Summary}</p>
                          ) : (
                            <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
                          )}
                        </div>

                        {/* orange line */}
                        <div
                          className='ml-auto mr-12'
                          style={{
                            backgroundColor: '#FFB039',
                            height: '2px',
                            width: '200px',
                          }}
                        />

                        {/* Recent Article Collection Row */}
                        <div className='mx-10 mb-10'>
                          <p className='text-l font-bold py-4'>
                            RECENT ARTICLES COLLECTION
                          </p>

                          {array && <Table articles={array} />}
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                        </div>
                      </div>
                    ) : (
                      <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
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

export default ProfilePage;
