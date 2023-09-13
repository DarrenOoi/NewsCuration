import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

function ProfileSearch() {
  const handleBrowse = () => {};

  const handleSearch = () => {};

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
                    <div className='hero-content lg:flex-row m-5'>
                      <img
                        src='https://cdn.britannica.com/31/149831-050-83A0E45B/Donald-J-Trump-2010.jpg'
                        className='max-w-sm rounded-lg shadow-2xl mr-5'
                        style={{ width: '400px', height: '250px' }}
                      />
                      <div>
                        <p className='text-3xl font-bold'>Johnathan Doe</p>
                        <p className='text-l font-bold py-4'>About</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                    {/* Filtered Summary Row */}
                    <div className='mx-10 mb-4'>
                      <p className='text-l font-bold py-4'>FILTERED SUMMARY</p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                    {/* Recent Article Collection Row */}
                    <div className='mx-10 mb-10'>
                      <p className='text-l font-bold py-4'>
                        RECENT ARTICLES COLLECTION
                      </p>
                      <div className='overflow-x-auto rounded-lg'>
                        <table className='table'>
                          {/* head */}
                          <thead>
                            <tr className='bg-gray-200'>
                              <th>
                                <text className='text-black font-bold'>
                                  TITLE
                                </text>
                              </th>
                              <th>
                                <text className='text-black font-bold'>
                                  DATE
                                </text>
                              </th>
                              <th>
                                <text className='text-black font-bold'>
                                  SOURCE
                                </text>
                              </th>
                              <th>
                                <text className='text-black font-bold'>
                                  BIAS SCORE
                                </text>
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* row 1 */}
                            <tr className='bg-gray-200'>
                              <th>THE GUY WENT TO DO THIS</th>
                              <td>11/09/23</td>
                              <td>Example</td>
                              <td>
                                <text className='text-orange-400 font-extrabold'>
                                  23%
                                </text>
                              </td>
                              <td>
                                <button className='btn btn-neutral rounded-full btn-xs'>
                                  VISIT ARTICLE
                                </button>
                              </td>
                            </tr>
                            {/* row 2 */}
                            <tr className='bg-gray-200'>
                              <th>THE GUY WENT TO DO THIS</th>
                              <td>11/09/23</td>
                              <td>Example</td>
                              <td>
                                <text className='text-orange-400 font-extrabold'>
                                  23%
                                </text>
                              </td>
                              <td>
                                <button className='btn btn-neutral rounded-full btn-xs'>
                                  VISIT ARTICLE
                                </button>
                              </td>
                            </tr>
                            {/* row 3 */}
                            <tr className='bg-gray-200'>
                              <th>THE GUY WENT TO DO THIS</th>
                              <td>11/09/23</td>
                              <td>Example</td>
                              <td>
                                <text className='text-orange-400 font-extrabold'>
                                  23%
                                </text>
                              </td>
                              <td>
                                <button className='btn btn-neutral rounded-full btn-xs'>
                                  VISIT ARTICLE
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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

export default ProfileSearch;
