import type { z } from 'zod';
import type {
  joinWaitlistInput,
  joinWaitlistOutput,
  waitlistCountryCodeSchema,
  waitlistEntity,
  waitlistFeatureSchema,
  waitlistGoalSchema,
  waitlistOperatingTimeSchema,
} from '@/schemas/waitlist';

export type WaitlistFeature = z.infer<typeof waitlistFeatureSchema>;
export type WaitlistGoal = z.infer<typeof waitlistGoalSchema>;
export type WaitlistOperatingTime = z.infer<typeof waitlistOperatingTimeSchema>;
export type WaitlistCountryCode = z.infer<typeof waitlistCountryCodeSchema>;
export type Waitlist = z.infer<typeof waitlistEntity>;
export type JoinWaitlistInput = z.infer<typeof joinWaitlistInput>;
export type JoinWaitlistOutput = z.infer<typeof joinWaitlistOutput>;
