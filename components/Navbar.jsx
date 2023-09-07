import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar bg-[#5F7A95] p-5'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-40'
          >
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <span className='text-[#7895B1] font-bold text-8xl'>
          JUST THE FACTS
        </span>
      </div>
      <div className='navbar-end' />
    </div>
  );
};

export default Navbar;
