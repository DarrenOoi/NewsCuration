export const fetchCampaign = async (id) => {
  try {
    const response = await fetch('http://localhost:5000/getCampaignDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
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
