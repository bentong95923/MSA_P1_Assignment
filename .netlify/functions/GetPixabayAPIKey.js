const { API_KEY_PIXABAY } = process.env;

exports.handler = async (event, context) => {
    console.log(API_KEY_PIXABAY)
  return {
    statusCode: 200,
    body: API_KEY_PIXABAY
  };
};