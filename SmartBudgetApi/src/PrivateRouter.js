import express from 'express';
import user from './Endpoint/User';
 
const router = express.Router();
 
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
const {
  getAll,
  getOne,
  post,
  put,
  remove
} = user;

router.get('/user', getAll);
router.get('/user/:id', getOne);
router.put('/user/:id', put);
router.delete('/user/:id', remove);
 
export default router;
