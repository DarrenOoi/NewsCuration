export const sendArticleComment = async (comment, author, url) => {
    try {
      const response = await fetch('http://localhost:5000//SaveArticleComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: comment, author: author, url: url})
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
      return [];
    }
  };