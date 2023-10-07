const GET = (req, res) => {
  // extracts query params "?q=XXX"
  const query = req.query;
  res.json({
    msg: 'pgl GET',
    query
  });
};

const POST = (req, res) => {
  const body = req.body;
  res.json({
    msg: 'pgl POST',
    body
  });
}

const PUT = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: 'pgl PUT',
    id
  });
};

const DELETE = (req, res) => {
  res.json({
    msg: 'pgl DELETE',
  });
};


module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}