/**
 * Fetch a list of recent articles from the database
 *
 * @returns {Array<Object>} An array of recent articles if found
 * @throws {Array} If the request fails or an error occurs, it returns an empty array.
 */
export const fetchRecentArticles = async () => {
  try {
    const response = await fetch('http://localhost:5000/GetRecentArticles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult.Result;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
