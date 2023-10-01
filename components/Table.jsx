import { useRouter } from 'next/router';

const Table = ({ articles }) => {
  const router = useRouter();

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
