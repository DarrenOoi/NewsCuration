/**
 * Fetch a list of politicians who are currently campaigning from the database
 *
 * @returns {Array<Object>} An array of politician objects representing those who are currently campaigning.
 * @throws {Array} If the request fails or an error occurs, it returns an empty array.
 */
export const fetchCampaigningPoliticians = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/GetCampaigningPoliticians',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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
