import { useRouter } from 'next/router';

/**
 * SavedDropdown is the component that displays a dropdown menu for saved pages.
 *
 * @component
 * @param {Array} items - An array of saved pages.
 * @param {Function} handleClick - A function to handle the click event.
 * @returns {JSX.Element} A React JSX element representing the saved pages dropdown.
 */
const SavedDropdown = ({ items, handleClick, currentPage }) => {
  const isEmpty = items.length === 0;
  const router = useRouter();

  /**
   * Function to visit an article when a saved page is clicked.
   * @param {string} url - The URL of the article to visit.
   */
  const visitArticle = (url) => {
    if (currentPage === 'article') {
      handleClick(url);
    } else {
      router.push({
        pathname: '/articleSearch',
        query: { url: url },
      });
    }
  };

  return (
    <div className='dropdown mt-14' style={{ width: '400px' }}>
      <label
        tabIndex={0}
        className='btn btn-ghost btn-sm m-1 text-[#7895B1] text-lg font-bold'
      >
        SAVED PAGES ▼
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-0 shadow bg-[#7895B1] rounded-box'
      >
        {isEmpty ? (
          <li>
            <a className='text-[#5F7A95] text-xs font-semibold'>
              NO SAVED PAGES
            </a>
          </li>
        ) : (
          items[0].map((item, index) => (
            <li>
              <a
                key={index}
                className='text-[#5F7A95] text-xs font-semibold'
                onClick={() => visitArticle(item.url)}
              >
                ● {item.header}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SavedDropdown;
