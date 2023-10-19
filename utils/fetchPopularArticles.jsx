/**
 * Fetch a list of popular articles based on the specified number from the database
 *
 * @param {number} num - The number of popular articles to retrieve.
 * @returns {Array<Object>} An array of popular articles if found.
 * @throws {Array} If the request fails or an error occurs, it returns an empty array.
 */
export const fetchPopularArticles = async (num) => {
  try {
    const response = await fetch(
      'http://localhost:5000/GetMostViewedArticles',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: num }),
      }
    );

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult.response;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
