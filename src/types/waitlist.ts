import type { z } from 'zod';
import type {
  joinWaitlistRequestBodySchema,
  joinWaitlistResponseSchema,
  waitlistCountryCodeSchema,
  waitlistFeatureSchema,
  waitlistGoalSchema,
  waitlistOperatingTimeSchema,
  waitlistSchema,
} from '@/schemas/waitlist';

export type WaitlistFeature = z.infer<typeof waitlistFeatureSchema>;
export type WaitlistGoal = z.infer<typeof waitlistGoalSchema>;
export type WaitlistOperatingTime = z.infer<typeof waitlistOperatingTimeSchema>;
export type WaitlistCountryCode = z.infer<typeof waitlistCountryCodeSchema>;
export type Waitlist = z.infer<typeof waitlistSchema>;
export type JoinWaitlistRequestBody = z.infer<
  typeof joinWaitlistRequestBodySchema
>;
export type JoinWaitlistResponse = z.infer<typeof joinWaitlistResponseSchema>;
