-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('space_owner', 'brand', 'vendor', 'blookforce_agent');
CREATE TYPE space_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
CREATE TYPE campaign_status AS ENUM ('draft', 'pending', 'active', 'completed', 'cancelled');
CREATE TYPE campaign_type AS ENUM ('wall_branding', 'digital_display', 'standee', 'banner', 'event_sponsorship');
CREATE TYPE blookperks_type AS ENUM ('spin_to_win', 'scratch_card', 'lucky_draw', 'survey', 'coupon');
CREATE TYPE job_status AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE commission_status AS ENUM ('pending', 'paid', 'cancelled');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Space Owners table
CREATE TABLE public.space_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    company_name TEXT,
    contact_person TEXT NOT NULL,
    address TEXT NOT NULL,
    pincode TEXT NOT NULL,
    landmark TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spaces table
CREATE TABLE public.spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.space_owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    space_type TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    space_size INTEGER NOT NULL,
    footfall_weekday INTEGER NOT NULL,
    footfall_weekend INTEGER NOT NULL,
    age_group TEXT NOT NULL,
    income_segment TEXT NOT NULL,
    has_cameras BOOLEAN DEFAULT FALSE,
    camera_count INTEGER,
    camera_type TEXT,
    camera_accessible BOOLEAN DEFAULT FALSE,
    photos TEXT[] DEFAULT '{}',
    status space_status DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands table
CREATE TABLE public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    brand_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    industry_type TEXT NOT NULL,
    website TEXT,
    social_links TEXT[] DEFAULT '{}',
    target_cities TEXT[] DEFAULT '{}',
    budget_range TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    service_categories TEXT[] NOT NULL,
    operational_cities TEXT[] NOT NULL,
    has_delivery BOOLEAN DEFAULT FALSE,
    avg_turnaround_time TEXT,
    gst_number TEXT,
    pan_number TEXT,
    bank_details JSONB,
    status space_status DEFAULT 'pending',
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_jobs INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BlookForce Agents table
CREATE TABLE public.blookforce_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    city TEXT NOT NULL,
    languages TEXT[] DEFAULT '{}',
    sales_experience BOOLEAN DEFAULT FALSE,
    availability TEXT NOT NULL,
    pan_number TEXT,
    bank_details JSONB,
    status space_status DEFAULT 'pending',
    total_referrals INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    campaign_type campaign_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    status campaign_status DEFAULT 'draft',
    requirements JSONB,
    deliverables TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BlookPerks Campaigns table
CREATE TABLE public.blookperks_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    campaign_type blookperks_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rewards JSONB NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    terms_conditions TEXT,
    status campaign_status DEFAULT 'draft',
    total_scans INTEGER DEFAULT 0,
    total_engagements INTEGER DEFAULT 0,
    total_redemptions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BlookWorks Jobs table
CREATE TABLE public.blookworks_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES public.vendors(id),
    job_type TEXT NOT NULL,
    description TEXT NOT NULL,
    locations TEXT[] NOT NULL,
    deliverables TEXT[] NOT NULL,
    timeline DATE NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    status job_status DEFAULT 'open',
    requirements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BlookForce Commissions table
CREATE TABLE public.blookforce_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES public.blookforce_agents(id) ON DELETE CASCADE,
    referral_type TEXT NOT NULL,
    referred_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status commission_status DEFAULT 'pending',
    payment_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR Scans table (for analytics)
CREATE TABLE public.qr_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.blookperks_campaigns(id) ON DELETE CASCADE,
    user_agent TEXT,
    ip_address INET,
    location JSONB,
    engaged BOOLEAN DEFAULT FALSE,
    redeemed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_spaces_owner_id ON public.spaces(owner_id);
CREATE INDEX idx_spaces_city ON public.spaces(city);
CREATE INDEX idx_spaces_status ON public.spaces(status);
CREATE INDEX idx_campaigns_brand_id ON public.campaigns(brand_id);
CREATE INDEX idx_campaigns_space_id ON public.campaigns(space_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_blookperks_space_id ON public.blookperks_campaigns(space_id);
CREATE INDEX idx_blookperks_qr_code ON public.blookperks_campaigns(qr_code);
CREATE INDEX idx_qr_scans_campaign_id ON public.qr_scans(campaign_id);
CREATE INDEX idx_qr_scans_created_at ON public.qr_scans(created_at);
