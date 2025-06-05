-- Create missing tables for complete admin dashboard functionality

-- Admin activity logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- System metrics for health monitoring
CREATE TABLE IF NOT EXISTS system_metrics (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  metric_name TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- BlookForce agents table
CREATE TABLE IF NOT EXISTS blookforce_agents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_code TEXT UNIQUE NOT NULL,
  total_referrals INTEGER DEFAULT 0,
  total_commission DECIMAL(10,2) DEFAULT 0,
  commission_rate DECIMAL(3,2) DEFAULT 0.10,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_id TEXT REFERENCES blookforce_agents(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_type TEXT NOT NULL CHECK (referral_type IN ('space_owner', 'brand', 'vendor')),
  commission_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Vendors table for BlookWorks
CREATE TABLE IF NOT EXISTS vendors (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  experience_years INTEGER,
  portfolio_url TEXT,
  hourly_rate DECIMAL(10,2),
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  rating DECIMAL(2,1) DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Jobs table for BlookWorks
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  posted_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vendor_id TEXT REFERENCES vendors(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  job_type TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'in_progress', 'completed', 'cancelled')),
  deadline DATE,
  requirements JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  amount DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User profiles table (if not exists)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_blookforce_agents_user_id ON blookforce_agents(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_agent_id ON referrals(agent_id);
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX IF NOT EXISTS idx_jobs_vendor_id ON jobs(vendor_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status);

-- Enable RLS
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE blookforce_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admin can view all logs" ON admin_logs FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin can view system metrics" ON system_metrics FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin can view all profiles" ON user_profiles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
