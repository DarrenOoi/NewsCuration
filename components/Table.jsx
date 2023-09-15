const Table = ({ articles }) => {
  return (
    <div className='overflow-x-auto rounded-lg'>
      <table className='table'>
        <thead>
          <tr className='bg-gray-200'>
            <th>
              <text className='text-black font-bold'>TITLE</text>
            </th>
            <th>
              <text className='text-black font-bold'>DATE</text>
            </th>
            <th>
              <text className='text-black font-bold'>SOURCE</text>
            </th>
            <th>
              <text className='text-black font-bold'>BIAS SCORE</text>
            </th>
            <th></th>
          </tr>
        </thead>
        {articles.map((article, index) => (
          <tbody key={index}>
            <tr className='bg-gray-200'>
              <th>{article.title}</th>
              <td>{article.date}</td>
              <td>{article.source}</td>
              <td>
                <text className='text-orange-400 font-extrabold'>
                  {article.score}
                </text>
              </td>
              <td>
                <button className='btn btn-neutral rounded-full btn-xs'>
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
