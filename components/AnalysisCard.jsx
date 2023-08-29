const AnalysisCard = ({ content }) => {
  return (
    <div className='card lg:card-side bg-white shadow-xl mt-10'>
      <div className='card-body'>
        <p className="text-black">{content}</p>
      </div>
    </div>
  );
};

export default AnalysisCard;