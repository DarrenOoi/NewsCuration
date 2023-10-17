import { useRouter } from 'next/router';
import { fetchSavedArticles } from '@/utils/fetchSavedArticles';
import { useState, useEffect } from 'react';
import SavedDropdown from './SavedDropdown';

const Menu = ({ currentPage }) => {
  const [saved, setSaved] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const saved = await Promise.all([fetchSavedArticles()]);

        // console.log(saved)

        setSaved(saved);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchArticles();
  }, []);

  const articleClick = () => {
    router.push('/articleSearch');
  };

  const profileClick = () => {
    router.push('/profileSearch');
  };

  return (
    <div className='bg-[#5F7A95] flex flex-row space-x-32 pb-8'>
      <div className='ml-20 mt-14 text-[#7895B1] text-5xl font-bold'>
        JUST THE FACTS
      </div>
      <div className='mt-14 flex flex-col'>
        <button
          onClick={articleClick}
          className={
            currentPage == 'article'
              ? 'btn btn-ghost btn-sm text-[#FFB039] text-lg font-bold'
              : 'btn btn-ghost btn-sm text-[#7895B1] text-lg font-bold'
          }
        >
          ARTICLE SEARCH
        </button>
        <button
          onClick={profileClick}
          className={
            currentPage == 'profile'
              ? 'btn btn-ghost btn-sm text-[#FFB039] text-lg font-bold'
              : 'btn btn-ghost btn-sm text-[#7895B1] text-lg font-bold'
          }
        >
          PROFILE SEARCH
        </button>
      </div>
      <SavedDropdown items={saved} />
    </div>
  );
};

export default Menu;
