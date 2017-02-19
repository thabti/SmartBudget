function getUrl(req, id) {
  // console.log(req);
  return `${req.protocol}://${req.get('host')}${req.originalUrl}/${id}`;
}

export { getUrl };

export default {
  getUrl
};
