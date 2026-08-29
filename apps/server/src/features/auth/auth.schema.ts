import { email, z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(2, 'Name at least 2 characters')
    .max(255),
  email: z.email({ message: 'Email is required' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password at least 8 characters'),
});
