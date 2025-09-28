import { Router } from 'express';
import { realizarLogin } from '../controllers/login.controller';

const router = Router();

router.post('/login', realizarLogin);

export default router;
