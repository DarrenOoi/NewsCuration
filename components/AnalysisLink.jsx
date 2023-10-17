/**
 * AnalysisLink component is a specific button that redirects the user to the analysis page from the 
 * article search page
 * 
 * @component
 */
const AnalysisLink = () => {
    return (
        <div>
            <button
                className='btn btn-lg btn-active btn-neutral rounded-full font-bold '
                type='submit'
            >
                CLICK FOR THE <span className="text-orange-500 font-extrabold">WHY</span>
            </button>
        </div>
    )
}

export default AnalysisLink;