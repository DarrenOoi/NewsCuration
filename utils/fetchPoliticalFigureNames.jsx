/**
 * Fetch the names of political figures mentioned in an article from the database
 *
 * @param {string} url - The URL of the article to analyze.
 * @returns {Array<String>} An array of political figure names mentioned in the article.
 * @throws {Array} If the request fails, an error occurs, or the server response is not as expected, it returns an empty array.
 */
export const fetchPoliticalFigureNames = async (url) => {
  try {
    const response = await fetch(
      'http://localhost:5000/getPoliticalFigureNames',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      }
    );

    if (response.ok) {
      const responseResult = await response.json();
      if (typeof responseResult.poi == "string") {
        return [];
      }
      return responseResult.poi;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
