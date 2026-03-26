import { z } from 'zod';

/** Body shape from `PushSubscription.prototype.toJSON()` (Web Push). */
export const pushSubscriptionBodySchema = z.object({
  endpoint: z.string().url(),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

export type PushSubscriptionBody = z.infer<typeof pushSubscriptionBodySchema>;
