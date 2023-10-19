/**
 * Fetch article information based on the provided URL.
 *
 * @param {string} text - The URL of the article to fetch information for.
 * @returns {Object} An object containing article information if found, or an error message if the request fails or an error occurs.
 */
export const fetchResults = async (text) => {
  try {
    const response = await fetch('http://localhost:5000/ArticleInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: text }),
    });

    if (response.ok) {
      const responseResult = await response.json();

      return responseResult;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return { response: 'Possibly invalid URL: ' + ' ' + response.statusText };
    }
  } catch (error) {
    console.error('Error:', error);
    return { response: 'Something went wrong... :' + error };
  }
};
