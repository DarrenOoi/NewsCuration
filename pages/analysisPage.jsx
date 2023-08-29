import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchResults } from '@/utils/fetchResults';
import { BsImage } from 'react-icons/bs';
import Navbar from '@/components/Navbar';
import BackButton from '@/components/BackButton';
import AnalysisCard from '@/components/AnalysisCard';

function AnalysisPage() {

  const router = useRouter();
  const handleClick = () => {
    router.push("http://localhost:3000");
  }

  return (
    <div className='min-h-screen bg-[#78909c] '>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Navbar />
      <div>
        <div className='flex justify-between mt-10 ml-20'>
          <BackButton handleClick={handleClick}/>
        </div>
        <div>
          <AnalysisCard/>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;