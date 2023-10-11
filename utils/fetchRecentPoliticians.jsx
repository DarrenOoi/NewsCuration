export const fetchRecentPoliticians = async () => {
  try {
    const response = await fetch('http://localhost:5000/GetRecentPoliticians', {
      method: 'POST',
      headers: {
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
    return 'Something went wrong...';
  }
};
