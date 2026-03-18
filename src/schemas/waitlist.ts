import { z } from 'zod';

export const waitlistFeatureSchema = z.enum([
  'AI ISO Templates',
  'Policy & Procedure Generation',
  'AI Auditing Systems',
  'All Of The Above',
]);

export const waitlistGoalSchema = z.enum([
  'Streamline & Automate Compliance Processes',
  'Achieve and Maintain ISO Certification Efficiently',
  'Build a Culture of Continuous Compliance & Improvement',
  'Reduce Risk & Strengthen Governance',
]);

export const waitlistOperatingTimeSchema = z.enum([
  '0-12 Months',
  '1-3 Years',
  '3-10 Years',
  '10 Years +',
]);

export const waitlistCountryCodeSchema = z.enum([
  '+1',
  '+44',
  '+61',
  '+64',
  '+91',
  '+49',
  '+33',
  '+81',
  '+86',
  '+65',
]);

export const waitlistEntity = z.object({
  id: z.number().int(),
  waitlist_token: z.string().uuid(),
  feature: waitlistFeatureSchema,
  goals: z.array(waitlistGoalSchema).nonempty(),
  operating_time: waitlistOperatingTimeSchema,
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  email: z.string().email().max(255),
  company_name: z.string().max(200),
  country_code: waitlistCountryCodeSchema,
  mobile: z.string().regex(/^\d{9,15}$/),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export const joinWaitlistInput = waitlistEntity.omit({
  id: true,
  waitlist_token: true,
  created_at: true,
  updated_at: true,
});

export const joinWaitlistOutput = waitlistEntity.pick({
  waitlist_token: true,
});
