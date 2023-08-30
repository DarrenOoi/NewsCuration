const Card = ({ header, title, content }) => {
  return (
    <div className='card lg:card-side bg-white shadow-xl'>
      <div className='card-body'>
      
        {/* <div className='card-title flex justify-center font-bold text-4xl text-gray-600'>
          {title}
        </div> */}
        <p className="text-black">{content}</p>

      </div>
    </div>
  );
};

export default Card;
