const Menu = ({currentPage}) => {

    return (
        <div className = "bg-[#5F7A95] flex flex-row space-x-32 pb-8">
            <div className = "ml-20 mt-14 text-[#7895B1] text-5xl font-bold">
                JUST THE FACTS
            </div>
            <div className = "mt-14 flex flex-col">
                <button 
                  className = {currentPage == "article" ? "btn btn-ghost btn-sm text-[#FFB039] text-lg font-bold" : "btn btn-ghost btn-sm text-[#7895B1] text-lg font-bold"}>
                    ARTICLE SEARCH
                </button>
                <button 
                  className = {currentPage == "profile" ? "btn btn-ghost btn-sm text-[#FFB039] text-lg font-bold" : "btn btn-ghost btn-sm text-[#7895B1] text-lg font-bold"}>
                    PROFILE SEARCH
                </button>
            </div>
            <div className="dropdown mt-14">
                <label tabIndex={0} className="btn btn-ghost btn-sm m-1 text-[#7895B1] text-lg font-bold">SAVED PAGES ▼</label>
                <ul tabIndex={0} className="dropdown-content menu p-0 shadow bg-[#7895B1] rounded-box">
                    <li><a className="text-[#5F7A95] text-xs font-semibold">PAGE ONE</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;