export default async function getResults(req, res) {
  try {
    const { text } = req.body;
    const response = text + ' received';
    console.log(text);

    res.status(200).json({ response: response });
  } catch (error) {
    res.status(500).json({ error: 'An error occured at api endpoint' });
  }
}
