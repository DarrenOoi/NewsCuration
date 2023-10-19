/**
 * Fetch information about a politician based on their name from the database
 *
 * @param {string} name - The name of the politician to search for.
 * @returns {Object} An object containing information about the politician if found
 * @throws {string} If the request fails or an error occurs, it returns an error message.
 */
export const fetchPolitician = async (name) => {
  try {
    const response = await fetch('http://localhost:5000/GetPolitician', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
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
    return 'Something went wrong...';
  }
};
