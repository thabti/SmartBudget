import express from 'express';
import product from './Endpoint/Product';
import auth from './Auth';
import user from './Endpoint/User';
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
const {
  post
} = user;
 
const router = express.Router();

/*
 * Routes that can be accessed by any one
 */
router.post('/auth', auth.login);  
router.post('/user/', post);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/product', product.getAll);
router.get('/product/:id', product.getOne);
router.post('/product/', product.create);
router.put('/product/:id', product.update);
router.delete('/product/:id', product.delete);
 
export default router;
