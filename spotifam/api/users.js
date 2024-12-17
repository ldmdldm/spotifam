import { createOrUpdateUser } from '../server/services/userService.js';
import { userSchema } from '../server/utils/validation.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userData = userSchema.parse(req.body);
    const matches = await createOrUpdateUser(userData);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors || []
    });
  }
}