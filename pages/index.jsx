import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { fetchResults } from '@/utils/fetchResults';
import BiasScore from '@/components/BiasScore';
import InputField from '@/components/InputField';
import Card from '@/components/Card';
import Input from '@/components/Input'
import Button from '@/components/Button'
import Slider from '@/components/Slider'
import { BsImage } from 'react-icons/bs';
import AnalysisPage from './analysisPage';
import { useRouter } from 'next/router';

function Index() {

    const router = useRouter();

    const ArticleSearch = () => {
        router.push('/articleSearch');
    }

    const ProfileSearch = () => {
        
    }

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
                            <div><text className="text-white font-bold text-xl"><text className="text-[#FFB039]">JUST THE FACTS</text> lets you discover unbiased
                            political insights. <text className="text-[#FFB039]">START</text> by either filtering through a
                            <text className="font-extrabold">political profiles</text> containing a collection of articles.</text></div>
                            
                            <div className="flex justify-center space-x-20 mt-10">
                                <div className='card bg-[#7895B1] rounded-xl'
                                    style={{ width: '300px', height: "200px"}}>
                                        <button className="btn btn-xs btn-neutral rounded-full mt-40 ml-12"
                                            style={{ width: '200px', height: "20px"}}
                                            onClick={ArticleSearch}>
                                            <text className="text-white">ARTICLE SEARCH</text>
                                        </button>
                                </div>
                                <div className='card bg-[#7895B1] rounded-xl'
                                    style={{ width: '300px', height: "200px"}}>
                                        <button className="btn btn-xs btn-neutral rounded-full mt-40 ml-12"
                                            style={{ width: '200px', height: "20px"}}
                                            onClick={ProfileSearch}>
                                            <text className="text-white">PROFILE SEARCH</text>
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;