import { Router } from 'express';
import { userSchema } from '../utils/validation.js';
import userService from '../services/userService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const userData = userSchema.parse(req.body);
    const matches = await userService.createOrUpdateUser(userData);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors || []
    });
  }
});

export const userRoutes = router;