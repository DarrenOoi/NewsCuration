import { useRouter } from 'next/router';

/**
 * Table is the component that displays a table of articles with titles, dates, sources, and bias scores.
 *
 * @component
 * @param {Array} articles - An array of article objects to display in the table.
 * @returns {JSX.Element} A React JSX element representing the table of articles.
 */
const Table = ({ articles }) => {
  const router = useRouter();

  
  /**
   * Handles clicking on a source URL to navigate to the article.
   * @param {string} url - The URL of the article source.
   */
  const visitSource = (url) => {
    router.push(url);
  };

  return (
    <div className='overflow-x-auto rounded-lg'>
      <table className='table'>
        <thead>
          <tr className='bg-gray-200'>
            <th>
              <p className='text-black font-bold'>TITLE</p>
            </th>
            <th>
              <p className='text-black font-bold'>DATE</p>
            </th>
            <th>
              <p className='text-black font-bold'>SOURCE</p>
            </th>
            <th>
              <p className='text-black font-bold'>BIAS SCORE</p>
            </th>
            <th></th>
          </tr>
        </thead>
        {articles.map((article, index) => (
          <tbody key={index}>
            <tr className='bg-gray-200'>
              <th>{article.Header}</th>
              <td>{article.InsertedAt}</td>
              <td>{article.URL}</td>
              <td>
                <p className='text-orange-400 font-extrabold'>
                  {article.LowerBias}
                </p>
              </td>
              <td>
                <button
                  className='btn btn-neutral rounded-full btn-xs'
                  onClick={() => visitSource(article.URL)}
                >
                  VISIT ARTICLE
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;
