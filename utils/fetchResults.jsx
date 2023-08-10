export const fetchResults = async (text) => {
  try {
    const response = await fetch('/api/getResults', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const responseResult = await response.json();
      return responseResult;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'request failed';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'error';
  }
};
