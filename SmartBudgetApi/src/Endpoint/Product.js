const product = {
  getAll: function (req, res) {
    const allProducts = data; // Spoof a DB call
    res.json(allProducts);
  },
  getOne: function (req, res) {
    const id = req.params.id;
    const [product] = data; // Spoof a DB call
    res.json(product);
  },
  create: function (req, res) {
    const newProduct = req.body;
    data.push(newProduct); // Spoof a DB call
    res.json(newProduct);
  },
  update: function (req, res) {
    const updateProduct = req.body;
    const id = req.params.id;
    data[id] = updateProduct // Spoof a DB call
    res.json(updateProduct);
  },
  delete: function (req, res) {
    const id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
const data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];

export default product;
