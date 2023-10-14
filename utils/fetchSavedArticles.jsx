export const fetchSavedArticles = async () => {
    try {
        const response = await fetch('http://localhost:5000/GetSavedArticles', {
            method: 'POST',
            header: {
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
      return [];
    }
};