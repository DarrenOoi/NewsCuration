export const fetchPoll = async (url) => {
    try {
        const response = await fetch('http://localhost:5000/GetPoll', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({url: url}),
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
      return [];
    }
}