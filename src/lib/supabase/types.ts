import type { JoinWaitlistInput, Waitlist } from '@/types';

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: Waitlist;
        Insert: JoinWaitlistInput;
        Update: Partial<JoinWaitlistInput>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
