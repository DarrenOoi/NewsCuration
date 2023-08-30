import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchResults } from '@/utils/fetchResults';
import { BsImage } from 'react-icons/bs';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';

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
          <Button handleClick={handleClick} text=" BACK TO THE FACTS"/>
        </div>
        <div>
          <Card/>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;