const SavedDropdown = ({items, handleClick}) => {
    const isEmpty = items.length === 0;
    console.log(items)

    return (
        <div className="dropdown mt-14">
            <label tabIndex={0} className="btn btn-ghost btn-sm m-1 text-[#7895B1] text-lg font-bold">SAVED PAGES ▼</label>
            {isEmpty ? (
                 <ul tabIndex={0} className="dropdown-content menu p-0 shadow bg-[#7895B1] rounded-box">
                     <li><a className="text-[#5F7A95] text-xs font-semibold">NO SAVED PAGES</a></li>
                </ul>
            ) : ( 
                items.map((item, index) => (
                    <ul key={index} tabIndex={0} className="dropdown-content menu p-0 shadow bg-[#7895B1] rounded-box">
                        <li><a className="text-[#5F7A95] text-xs font-semibold">{item.header}</a></li>
                    </ul>
                )))}
        </div>
    );
};

export default SavedDropdown;