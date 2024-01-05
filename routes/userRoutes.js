import express from 'express';
import { createUser,getAllUsers,findUserById, updateUser,deleteUser,depositUser,withdrawUser,transferUser,filterUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/users',createUser);
router.get('/users',getAllUsers);
router.get('/users/:id',findUserById);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.put('/users/:id/deposit', depositUser);
router.put('/users/:id/withdraw', withdrawUser);
router.put('/users/:from/transfer/:id', transferUser);
router.get('/users', filterUsers);
export default router;