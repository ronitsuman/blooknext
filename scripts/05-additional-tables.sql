-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_type TEXT NOT NULL,
    payment_id TEXT,
    order_id TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'expired')),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    service_categories TEXT[] DEFAULT '{}',
    operational_cities TEXT[] DEFAULT '{}',
    has_delivery BOOLEAN DEFAULT false,
    avg_turnaround_time TEXT,
    gst_number TEXT,
    pan_number TEXT,
    bank_details JSONB,
    portfolio_images TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blookforce_agents table
CREATE TABLE IF NOT EXISTS blookforce_agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    languages TEXT[] DEFAULT '{}',
    sales_experience BOOLEAN DEFAULT false,
    availability TEXT CHECK (availability IN ('full-time', 'part-time', 'flexible')),
    pan_number TEXT,
    bank_details JSONB,
    referral_code TEXT UNIQUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blookworks_jobs table
CREATE TABLE IF NOT EXISTS blookworks_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    job_type TEXT NOT NULL CHECK (job_type IN ('printing', 'fabrication', 'installation', 'deployment')),
    description TEXT,
    locations TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    timeline TIMESTAMP WITH TIME ZONE,
    budget DECIMAL(10,2),
    requirements JSONB,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in-progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blookforce_commissions table
CREATE TABLE IF NOT EXISTS blookforce_commissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES blookforce_agents(id) ON DELETE CASCADE,
    referral_type TEXT NOT NULL CHECK (referral_type IN ('space', 'brand', 'vendor')),
    referred_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign_analytics table
CREATE TABLE IF NOT EXISTS campaign_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    total_reach INTEGER DEFAULT 0,
    total_engagements INTEGER DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    cost_per_engagement DECIMAL(10,2),
    roi_percentage DECIMAL(5,2),
    demographics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_blookforce_agents_user_id ON blookforce_agents(user_id);
CREATE INDEX IF NOT EXISTS idx_blookworks_jobs_campaign_id ON blookworks_jobs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_blookforce_commissions_agent_id ON blookforce_commissions(agent_id);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_campaign_id ON campaign_analytics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Add RLS policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blookforce_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blookworks_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blookforce_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Vendors policies
CREATE POLICY "Users can view own vendor profile" ON vendors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vendor profile" ON vendors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own vendor profile" ON vendors FOR UPDATE USING (auth.uid() = user_id);

-- BlookForce agents policies
CREATE POLICY "Users can view own agent profile" ON blookforce_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own agent profile" ON blookforce_agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own agent profile" ON blookforce_agents FOR UPDATE USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
