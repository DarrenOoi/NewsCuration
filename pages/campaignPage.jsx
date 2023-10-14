import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import Menu from '@/components/Menu';
import Button from '@/components/Button';
import { findFlagUrlByCountryName } from 'country-flags-svg';
import { useRouter } from 'next/router';
import { fetchPolitician } from '@/utils/fetchPolitician';
import { useEffect, useState } from 'react';
import JustTheFactsLine from '@/components/JustTheFactsLine';
import Input from '@/components/Input';

function campaignPage() {
  const router = useRouter();
  const { name } = router.query;
  const handleSearch = () => {};
  const flagUrl = findFlagUrlByCountryName('Australia');

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
                    ></div>
                    <div
                      className='rounded-3xl bg-white my-5 mx-2 w-full'
                      style={{ height: '625px' }}
                    ></div>
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
