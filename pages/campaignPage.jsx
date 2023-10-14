import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Menu from '@/components/Menu';
import Button from '@/components/Button';
import { findFlagUrlByCountryName } from 'country-flags-svg';
import { useRouter } from 'next/router';
import { fetchPoliticianByID } from '@/utils/fetchPoliticianByID';
import { useEffect, useState } from 'react';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import { fetchCampaign } from '@/utils/fetchCampaign';

function campaignPage() {
  const router = useRouter();
  const { id, about, image } = router.query;
  const handleSearch = () => {};
  const [campaign, setCampaign] = useState(null);
  const flagUrl = findFlagUrlByCountryName('Australia');

  useEffect(() => {
    async function fetchCampaignInfo() {
      if (id) {
        try {
          const campaign = await fetchCampaign(id);
          setCampaign(campaign);
          console.log(campaign);
        } catch (error) {
          //add error handling when request fails
          console.log('error');
        }
      }
    }
    fetchCampaignInfo();
  }, [id]);

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
                  CAMPAIGN COMPARISON
                </span>
              </div>
              <div className='flex'>
                <div className='flex items-center justify-center mr-1'>
                  <JustTheFactsLine />
                </div>
                <div
                  className='bg-[#7895B1] p-4 rounded-xl'
                  style={{ width: '1200px', height: '700px' }}
                >
                  <div className='flex flex-row'>
                    <div
                      className='rounded-3xl bg-white my-5 mx-2 w-full'
                      style={{ height: '625px' }}
                    >
                      <div className='hero-content lg:flex-row mx-5'>
                        <div>
                          <img
                            src={image}
                            // src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                            className='max-w-sm rounded-lg '
                            style={{ width: '150px', height: '175px' }}
                          />
                        </div>
                        <div
                          className='mb-24'
                          style={{ width: '325px', height: '125px' }}
                        >
                          <p className='text-2xl font-bold my-2'>John Doe</p>
                          <p className='text-xs text-gray-400	'>
                            Ut enim ad minim veniam
                          </p>
                          <p className='text-l font-bold mt-2'>About</p>
                          {/* orange line */}
                          <div
                            className='ml-auto mr-40'
                            style={{
                              backgroundColor: '#FFB039',
                              height: '2px',
                              width: '200px',
                            }}
                          />
                          <p className='text-s mr-10'>{about}</p>
                          {/* orange line */}
                          <div
                            className='ml-auto mr-40 mt-1'
                            style={{
                              backgroundColor: '#FFB039',
                              height: '2px',
                              width: '200px',
                            }}
                          />
                        </div>
                      </div>
                      <p className='text-l font-bold ml-10'>Key Policies</p>{' '}
                      {campaign && (
                        <div>
                          <p className='text-l ml-10'>
                            {campaign.PolicyNameTitle}
                          </p>
                          <p className='text-s ml-10'>{campaign.PolicyInfo}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className='rounded-3xl bg-white my-5 mx-2 w-full'
                      style={{ height: '625px' }}
                    >
                      {' '}
                      <div className='hero-content lg:flex-row mx-5'>
                        <div>
                          <img
                            // src={politician?.ImageLink}
                            src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                            className='max-w-sm rounded-lg'
                            style={{ width: '150px', height: '175px' }}
                          />
                        </div>
                        <div
                          className='mb-24'
                          style={{ width: '325px', height: '125px' }}
                        >
                          <p className='text-2xl font-bold my-2'>John Doe</p>
                          <p className='text-xs text-gray-400	'>
                            Ut enim ad minim veniam
                          </p>
                          <p className='text-l font-bold mt-2'>
                            Campaign Promise
                          </p>
                          {/* orange line */}
                          <div
                            className='ml-auto mr-40'
                            style={{
                              backgroundColor: '#FFB039',
                              height: '2px',
                              width: '200px',
                            }}
                          />
                          <p className='text-s mr-10'>
                            {' '}
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla metus orci, venenatis dictum dolor a,
                            scelerisque egestas dui.
                          </p>
                          {/* orange line */}
                          <div
                            className='ml-auto mr-40 mt-1'
                            style={{
                              backgroundColor: '#FFB039',
                              height: '2px',
                              width: '200px',
                            }}
                          />
                        </div>
                      </div>
                      <p className='text-l font-bold ml-10'>Key Policies</p>{' '}
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

export default campaignPage;
