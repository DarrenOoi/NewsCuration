/**
 * Send an article comment to the database
 *
 * @param {string} author - The author of the comment.
 * @param {string} comment - The text of the comment.
 * @param {string} url - The URL of the article to associate the comment with.
 * @returns {Object|string} An object containing the result of the comment submission if the request is successful, or a string with an error message if the request fails or an error occurs.
 */
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
