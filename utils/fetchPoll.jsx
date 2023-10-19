/**
 * Fetch information about a political poll based on a given URL from the database
 *
 * @param {string} url - The URL of the political poll to retrieve information about.
 * @returns {Object} An object containing information about the political poll if found
 * @throws {string} If the request fails or an error occurs, it returns an error message.
 */
export const fetchPoll = async (url) => {
  try {
    const response = await fetch('http://localhost:5000/GetPoll', {
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
