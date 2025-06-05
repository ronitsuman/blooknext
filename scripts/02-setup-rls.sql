-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blookforce_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blookperks_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blookworks_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blookforce_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Space owners policies
CREATE POLICY "Space owners can view their own data" ON public.space_owners
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Space owners can update their own data" ON public.space_owners
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Space owners can insert their own data" ON public.space_owners
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Spaces policies
CREATE POLICY "Anyone can view active spaces" ON public.spaces
    FOR SELECT USING (status = 'active');

CREATE POLICY "Space owners can manage their spaces" ON public.spaces
    FOR ALL USING (
        owner_id IN (
            SELECT id FROM public.space_owners WHERE user_id = auth.uid()
        )
    );

-- Brands policies
CREATE POLICY "Brands can view their own data" ON public.brands
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Brands can update their own data" ON public.brands
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Brands can insert their own data" ON public.brands
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Vendors policies
CREATE POLICY "Anyone can view active vendors" ON public.vendors
    FOR SELECT USING (status = 'active');

CREATE POLICY "Vendors can manage their own data" ON public.vendors
    FOR ALL USING (user_id = auth.uid());

-- BlookForce agents policies
CREATE POLICY "Agents can view their own data" ON public.blookforce_agents
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Agents can update their own data" ON public.blookforce_agents
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Agents can insert their own data" ON public.blookforce_agents
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Campaigns policies
CREATE POLICY "Brands can manage their campaigns" ON public.campaigns
    FOR ALL USING (
        brand_id IN (
            SELECT id FROM public.brands WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Space owners can view campaigns for their spaces" ON public.campaigns
    FOR SELECT USING (
        space_id IN (
            SELECT s.id FROM public.spaces s
            JOIN public.space_owners so ON s.owner_id = so.id
            WHERE so.user_id = auth.uid()
        )
    );

-- BlookPerks campaigns policies
CREATE POLICY "Space owners can manage their BlookPerks campaigns" ON public.blookperks_campaigns
    FOR ALL USING (
        space_id IN (
            SELECT s.id FROM public.spaces s
            JOIN public.space_owners so ON s.owner_id = so.id
            WHERE so.user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can view active BlookPerks campaigns by QR code" ON public.blookperks_campaigns
    FOR SELECT USING (status = 'active');

-- QR scans policies (public for analytics)
CREATE POLICY "Anyone can insert QR scans" ON public.qr_scans
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Space owners can view scans for their campaigns" ON public.qr_scans
    FOR SELECT USING (
        campaign_id IN (
            SELECT bp.id FROM public.blookperks_campaigns bp
            JOIN public.spaces s ON bp.space_id = s.id
            JOIN public.space_owners so ON s.owner_id = so.id
            WHERE so.user_id = auth.uid()
        )
    );
