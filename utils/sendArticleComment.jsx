export const sendArticleComment = async (author, comment, url) => {
  try {
    const response = await fetch('http://localhost:5000/SaveArticleComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author: author, comment: comment, url: url }),
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
