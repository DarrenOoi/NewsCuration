/**
 * Fetches comments for a given article URL from the database
 *
 * @param {string} url - The URL of the article to fetch comments for.
 * @returns {Array<string>} An array of comments.
 * @throws {string} If the request fails or an error occurs, it returns an error message.
 */
export const fetchArticleComments = async (url) => {
  try {
    const response = await fetch('http://localhost:5000/getArticleComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult.Result;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'Something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
