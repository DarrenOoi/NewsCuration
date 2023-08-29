const Card = ({ content }) => {
  return (
    <div className='card lg:card-side bg-white shadow-xl mt-10'>
      <div className='card-body'>
        <h2 className='card-title text-orange-500 font-bold'>THE FACTS</h2>
        <p className="text-black">{content}</p>
      </div>
    </div>
  );
};

export default Card;
