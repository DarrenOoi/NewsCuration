export const fetchPopularArticles = async (num) => {
  try {
    const response = await fetch(
      'http://localhost:5000/GetMostViewedArticles',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: num }),
      }
    );

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult.response;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'Something went wrong';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Something went wrong...';
  }
};
