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
  const { id, about, image, name, title } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [campaigningPoliticians, setCampaigningPoliticians] = useState([]);
  const [comparisonDetails, setComparisonDetails] = useState({});

  useEffect(() => {
    async function fetchCampaignInfo() {
      if (id) {
        try {
          const [campaign, res] = await Promise.all([
            fetchCampaign(id),
            fetchCampaigningPoliticians(),
          ]);
          const filteredRes = res.filter((obj) => obj.ID !== id);
          setCampaign(campaign);
          setCampaigningPoliticians(filteredRes);
        } catch (error) {
          //add error handling when request fails
          console.log('error');
        }
      }
    }
    fetchCampaignInfo();
  }, [id]);

  const handleClick = async (name, ID, about, image, title) => {
    try {
      const res = await fetchCampaign(ID);
      // console.log('this is campagin comparison', res);
      setComparison(res);
      const obj = {
        name: name,
        ID: ID,
        about: about,
        image: image,
        title: title,
      };
      setComparisonDetails(obj);
    } catch (error) {
      //add error handling when request fails
      console.log('error');
    }
  };

  function getFirstTwoSentences(inputString) {
    // Define a regular expression to match sentence-ending punctuation.
    // This regex will match '.', '!', or '?' followed by a space, the end of the string,
    // or a sentence that doesn't end with a space (e.g., at the end of the string).
    const sentenceEndPattern = /([.!?])(?:\s|$|(?!.*\s\1))/;

    // Split the input string into an array of sentences using the sentence-ending pattern.
    const sentences = inputString.split(sentenceEndPattern);

    // Get the first two sentences, or all available if there are fewer than two.
    const firstTwoSentences = sentences.slice(0, 3).join('');

    return firstTwoSentences;
  }

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
                        <div className='mb-auto mt-4'>
                          <img
                            src={image}
                            // src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                            className='max-w-sm rounded-lg'
                            style={{ width: '150px', height: '175px' }}
                          />
                        </div>
                        <div className='mb-2' style={{ width: '325px' }}>
                          <p className='text-2xl font-bold my-2'>{name}</p>
                          <p className='text-xs text-gray-400	'>{title} </p>
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
                          <p className='text-s mr-10'>
                            {about && getFirstTwoSentences(about)}
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
                      {campaign ? (
                        <div className='mx-4 mb-2'>
                          <p className='text-xl font-bold ml-2 mb-2'>
                            Key Policies
                          </p>
                          {campaign.map((item, index) => (
                            <div className='mx-4 mb-2' key={index}>
                              <details className='collapse collapse-arrow bg-base-200 outline outline-black'>
                                <summary className='collapse-title text-l font-medium '>
                                  {item.PolicyNameTitle}
                                </summary>
                                <div className='collapse-content text-s'>
                                  {item.PolicyInfo}
                                </div>
                              </details>
                            </div>
                          ))}
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
                          <div className='mb-auto mt-4'>
                            <img
                              src={comparisonDetails?.image}
                              // src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                              className='max-w-sm rounded-lg'
                              style={{ width: '150px', height: '175px' }}
                            />
                          </div>
                          <div className='mb-2' style={{ width: '325px' }}>
                            <p className='text-2xl font-bold my-2'>
                              {comparisonDetails?.name}
                            </p>
                            <p className='text-xs text-gray-400	'>
                              {comparisonDetails?.title}
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
                              {comparisonDetails &&
                                getFirstTwoSentences(comparisonDetails.about)}
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
                          <p className='text-xl font-bold ml-4 mb-2'>
                            Key Policies
                          </p>
                          {comparison.map((item, index) => (
                            <div className='mx-4 mb-2' key={index}>
                              <details className='collapse collapse-arrow bg-base-200 outline outline-black'>
                                <summary className='collapse-title text-l font-medium '>
                                  {item.PolicyNameTitle}
                                </summary>
                                <div className='collapse-content text-s'>
                                  {item.PolicyInfo}
                                </div>
                              </details>
                            </div>
                          ))}
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
