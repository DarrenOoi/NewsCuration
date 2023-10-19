/**
 * Send a request to save an article to the database
 *
 * @param {string} url - The URL of the article to be saved.
 * @returns {Object|string} An object containing the result of the article save request if the request is successful, or a string with an error message if the request fails or an error occurs.
 */
export const sendSaveArticle = async (url) => {
  try {
    const response = await fetch('http://localhost:5000/SaveArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'Something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
