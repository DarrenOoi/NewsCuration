/**
 * Search for a politician by name on the database
 *
 * @param {string} name - The name of the politician to search for.
 * @returns {Array|string} An array of search results if the request is successful, or a string with an error message if the request fails or an error occurs.
 */
export const searchPolitician = async (name) => {
  try {
    const response = await fetch('http://localhost:5000/GetPolicitianSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nameSearch: name }),
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
    return 'Something went wrong...';
  }
};
