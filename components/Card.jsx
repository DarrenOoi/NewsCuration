const Card = ({ content }) => {
  return (
    <div className='card lg:card-side bg-white shadow-xl mt-10'>
      <div className='card-body'>
        <h2 className='card-title text-orange-500'>The Facts</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;
