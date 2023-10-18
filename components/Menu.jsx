import { useRouter } from 'next/router';
import { fetchSavedArticles } from '@/utils/fetchSavedArticles';
import { useState, useEffect } from 'react';
import SavedDropdown from './SavedDropdown';

/**
 * Menu is the componenet for the application's navigation menu.
 * It includes buttons for article and profile search, as well as a saved articles dropdown.
 *
 * @component
 * @param {string} currentPage - The currently active page 
 * @returns {JSX.Element} A React JSX element representing the menu.
 */
const Menu = ({ currentPage, handleClick }) => {

   // State to store saved articles
  const [saved, setSaved] = useState([]);

  // Router for navigation
  const router = useRouter();

  // Fetch saved articles 
  useEffect(() => {
    async function fetchArticles() {
      try {
        const saved = await Promise.all([fetchSavedArticles()]);
        setSaved(saved);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchArticles();
  }, []);

  /**
   * Function to navigate to the article search page.
   */
  const articleClick = () => {
    router.push('/articleSearch');
  };

  /**
   * Function to navigate to the profile search page.
   */
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
      <SavedDropdown items={saved} handleClick={handleClick}/>
    </div>
  );
};

export default Menu;
