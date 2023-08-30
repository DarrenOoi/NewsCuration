const Card = ({ header, title, content }) => {
  return (
    <div className='card lg:card-side bg-white shadow-xl mt-10'>
      <div className='card-body'>

        <h2 className='card-title text-orange-500 font-bold'>{header}</h2>
      
        <div className='card-title flex justify-center font-bold text-4xl text-gray-600'>
          {title}
        </div>
        <p className="text-black">{content}</p>

      </div>
    </div>
  );
};

export default Card;
