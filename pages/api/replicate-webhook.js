// The webhook will be a POST request where the request body is the
// same as the response body of the get prediction operation. If
// there are network problems, we will retry the webhook a few
// times, so make sure it can be safely called more than once.

export default async function handler(req, res) {
  console.log("Received webhook", req.body);
  res.end();
}
