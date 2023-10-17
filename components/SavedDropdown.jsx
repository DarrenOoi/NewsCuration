const SavedDropdown = ({ items, handleClick }) => {
  const isEmpty = items.length === 0;

  return (
    <div className='dropdown mt-14'>
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
          items.map((item, index) => (
            <li>
              <a key={index} className='text-[#5F7A95] text-xs font-semibold'>
                {item.header}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SavedDropdown;