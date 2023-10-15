import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Menu from '@/components/Menu';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import { fetchCampaign } from '@/utils/fetchCampaign';
import { searchPolitician } from '@/utils/searchPolitician';
import { fetchCampaigningPoliticians } from '@/utils/fetchCampaigningPoliticians';
import List from '@/components/List';

function campaignPage() {
  const router = useRouter();
  const { id, about, image, name } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [campaigningPoliticians, setCampaigningPoliticians] = useState([]);
  const [comparisonDetails, setComparisonDetails] = useState({});

  useEffect(() => {
    async function fetchCampaignInfo() {
      if (id) {
        try {
          //try to send the two request at the same time
          const res = await fetchCampaigningPoliticians();
          setCampaigningPoliticians(res);
          const campaign = await fetchCampaign(id);
          setCampaign(campaign);
        } catch (error) {
          //add error handling when request fails
          console.log('error');
        }
      }
    }
    fetchCampaignInfo();
  }, [id]);

  const handleClick = async (name, ID, about, image) => {
    try {
      const res = await fetchCampaign(ID);
      console.log('this is campagin comparison', res);
      setComparison(res);
      const obj = {
        name: name,
        ID: ID,
        about: about,
        image: image,
      };
      setComparisonDetails(obj);
    } catch (error) {
      //add error handling when request fails
      console.log('error');
    }
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
                  CAMPAIGN COMPARISON
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
                  <div className='flex justify between'>
                    <div className=' ml-4'>
                      <Button
                        text='← BACK TO THE'
                        boldText='PREVIOUS PROFILE'
                        handleClick={() => router.back()}
                      />
                    </div>
                    {comparison && (
                      <div className='ml-auto mr-2'>
                        <Button
                          boldText='RE-SELECT'
                          handleClick={() => setComparison(null)}
                        />
                      </div>
                    )}
                  </div>
                  <div className='flex flex-row'>
                    <div className='rounded-3xl bg-white my-5 mx-2 w-full min-h-[625px] h-[auto]'>
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
                          <p className='text-2xl font-bold my-2'>{name}</p>
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
                      {campaign ? (
                        <div>
                          <p className='text-l font-bold ml-10'>Key Policies</p>{' '}
                          <p className='text-l ml-10'>
                            {campaign.PolicyNameTitle}
                          </p>
                          <p className='text-s ml-10'>{campaign.PolicyInfo}</p>
                        </div>
                      ) : (
                        <div className='flex justify-center'>
                          <span className='mt-2 loading loading-spinner loading-lg text-warning'></span>
                        </div>
                      )}
                    </div>
                    {/* right side */}
                    <div className='rounded-3xl bg-[#DBEAFE] my-5 mx-2 w-full min-h-[625px] h-[auto]'>
                      {comparison ? (
                        <div className='hero-content lg:flex-row mx-5'>
                          <div>
                            <img
                              src={comparisonDetails?.image}
                              // src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                              className='max-w-sm rounded-lg'
                              style={{ width: '150px', height: '175px' }}
                            />
                          </div>
                          <div
                            className='mb-24'
                            style={{ width: '325px', height: '125px' }}
                          >
                            <p className='text-2xl font-bold my-2'>
                              {comparisonDetails?.name}
                            </p>
                            <p className='text-xs text-gray-400	'>
                              Ut enim ad minim veniam
                            </p>
                            <p className='text-l font-bold mt-2'>About </p>
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
                              {comparisonDetails?.about}
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
                      ) : (
                        <div className='mt-6'>
                          <List
                            title='CAMPAIGNING POLITICIANS'
                            items={campaigningPoliticians}
                            campaign={true}
                            handleClick={handleClick}
                          />
                        </div>
                      )}
                      {comparison && (
                        <div>
                          <p className='text-l font-bold ml-10'>Key Policies</p>
                          <p className='text-l ml-10'>
                            {comparison.PolicyNameTitle}
                          </p>
                          <p className='text-s ml-10'>
                            {comparison.PolicyInfo}
                          </p>
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
    </div>
  );
}

export default campaignPage;
