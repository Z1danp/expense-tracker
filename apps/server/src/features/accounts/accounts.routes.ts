import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import {
  getAccounts,
  createAccount,
  updateAccount,
} from './accounts.controller.js';

const router = Router();

// Semua rute akun wajib terautentikasi (JWT cookie)
router.use(authMiddleware);

router.get('/', getAccounts);
router.post('/', createAccount);
router.patch('/:id', updateAccount);

export default router;
