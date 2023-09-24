export const fetchResults = async (text) => {
  try {
    //test api endpoint
    // const response = await fetch('/api/getResults', {
    const response = await fetch('http://localhost:5000/ArticleInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: text }),
      // body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const responseResult = await response.json();

      return responseResult;
    } else {
      console.error('Request failed:', response.status, response.statusText);
      return { response: 'Possibly invalid URL: ' + ' ' + response.statusText };
    }
  } catch (error) {
    console.error('Error:', error);
    return { response: 'Something went wrong... :' + error };
  }
};
