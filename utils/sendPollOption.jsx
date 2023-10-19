/**
 * Send a selected poll option for an article to the database
 *
 * @param {string} url - The URL of the article to associate the poll option with.
 * @param {number} optionIndex - The index of the selected poll option.
 * @returns {Object|string} An object containing the result of the poll option submission if the request is successful, or a string with an error message if the request fails or an error occurs.
 */
export const sendPollOption = async (url, optionIndex) => {
  try {
    const response = await fetch('http://localhost:5000/UpdatePoll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url, optionIndex: optionIndex }),
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
