/**
 * Fetch the bias score for an article from the database
 *
 * @param {string} url - The URL of the article for which the bias score is to be fetched.
 * @returns {number|string} A number representing the bias score if the request is successful, or a string with an error message if the request fails or an error occurs.
 */
export const fetchScore = async (url) => {
  try {
    const response = await fetch('http://localhost:5000/ArticleBiasedScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (response.ok) {
      const responseResult = await response.json();

      return responseResult.response;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'Something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Something went wrong...';
  }
};
