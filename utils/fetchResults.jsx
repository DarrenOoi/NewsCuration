export const fetchResults = async (text) => {
  try {
    //test api endpoint
    // const response = await fetch('/api/getResults', {
    const response = await fetch('http://localhost:5000/GPT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
      // body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const responseResult = await response.json();
      console.log('this is response:' + responseResult.response);

      return responseResult.response;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return 'request failed';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Something went wrong...';
  }
};
