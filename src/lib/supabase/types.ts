import type { JoinWaitlistRequestBody, Waitlist } from '@/types';

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: Waitlist;
        Insert: JoinWaitlistRequestBody;
        Update: Partial<JoinWaitlistRequestBody>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
