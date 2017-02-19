function internalError(res) {
  res.status(500);
  res.json({
    status: 500,
    message: "Oops something went wrong"
  });
}

function tokenExpired(res) {
  res.status(400);
  res.json({
    status: 400,
    message: "Token Expired"
  });
}

function unathorize(res) {
  res.status(403);
  res.json({
    status: 403,
    message: "User unauthorized!"
  });
}

function invalidUser(res) {
  res.status(401);
  res.json({
    status: 401,
    message: "Invalid Token"
  });
}

function invalidCredentials(res) {
  res.status(401);
  res.json({
    status: 401,
    message: "Invalid credentials"
  });
}

function dataNotFound(res, dataDescription) {
  res.status(404);
  res.json({
    status: 404,
    message: `{dataDescription} not found`
  });
}

export { internalError };
export { tokenExpired };
export { unathorize };
export { invalidUser };
export { invalidCredentials };
export { dataNotFound };

export default {
  internalError,
  tokenExpired,
  unathorize,
  invalidUser,
  invalidCredentials,
  dataNotFound
};
