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
