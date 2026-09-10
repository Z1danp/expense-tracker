import { z } from 'zod';
// optional karena 
export const createAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Account name cannot be empty' })
    .max(255, { message: 'Account name cannot exceed 255 characters' }),
  type: z.enum(['tunai', 'bank', 'e-wallet'], {
    message: "Account type must be one of: 'tunai', 'bank', 'e-wallet'",
  }),
  initial_balance: z
    .number({
      message: 'Initial balance must be a number',
    })
    .int({ message: 'Initial balance must be an integer' })
    .min(0, { message: 'Initial balance cannot be negative' })
    .default(0),
});

export const updateAccountSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Account name cannot be empty' })
      .max(255, { message: 'Account name cannot exceed 255 characters' })
      .optional(),
    type: z
      .enum(['tunai', 'bank', 'e-wallet'], {
        message: "Account type must be one of: 'tunai', 'bank', 'e-wallet'",
      })
      .optional(),
    is_active: z.boolean({ message: 'is_active must be a boolean' }).optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.type !== undefined ||
      data.is_active !== undefined,
    {
      message: 'At least one field (name, type, is_active) must be provided for update',
    }
  );

export const accountIdParamSchema = z.object({
  id: z.string().uuid({ message: 'Invalid account ID format (must be UUID)' }),
});


export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
