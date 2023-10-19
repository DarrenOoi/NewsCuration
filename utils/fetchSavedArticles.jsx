/**
 * Fetch saved articles from the database
 *
 * @returns {Array} An array of saved articles if the request is successful, or an empty array if the request fails or an error occurs.
 */
export const fetchSavedArticles = async () => {
  try {
    const response = await fetch('http://localhost:5000/GetSavedArticles', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
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
