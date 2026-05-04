import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jkirjhpnddkrkpghpxdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXJqaHBuZGRrcmtwZ2hweGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3OTkyOTksImV4cCI6MjA5MzM3NTI5OX0.sot9GO_j8ZBXSFuccRz86Lnzfr2wiJ4w6ouV4f5ipjI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
