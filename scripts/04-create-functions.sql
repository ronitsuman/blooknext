-- Function to increment campaign analytics
CREATE OR REPLACE FUNCTION increment_campaign_scans(
    campaign_id UUID,
    engaged BOOLEAN DEFAULT FALSE,
    redeemed BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.blookperks_campaigns
    SET 
        total_scans = total_scans + 1,
        total_engagements = total_engagements + CASE WHEN engaged THEN 1 ELSE 0 END,
        total_redemptions = total_redemptions + CASE WHEN redeemed THEN 1 ELSE 0 END,
        updated_at = NOW()
    WHERE id = campaign_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get space analytics
CREATE OR REPLACE FUNCTION get_space_analytics(space_owner_id UUID)
RETURNS TABLE (
    total_spaces BIGINT,
    active_campaigns BIGINT,
    total_revenue DECIMAL,
    total_scans BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH space_data AS (
        SELECT s.id as space_id
        FROM public.spaces s
        WHERE s.owner_id = space_owner_id
    ),
    campaign_data AS (
        SELECT 
            COUNT(*) as active_campaigns,
            COALESCE(SUM(c.budget), 0) as total_revenue
        FROM public.campaigns c
        JOIN space_data sd ON c.space_id = sd.space_id
        WHERE c.status = 'active'
    ),
    blookperks_data AS (
        SELECT COALESCE(SUM(bp.total_scans), 0) as total_scans
        FROM public.blookperks_campaigns bp
        JOIN space_data sd ON bp.space_id = sd.space_id
    )
    SELECT 
        (SELECT COUNT(*) FROM space_data)::BIGINT,
        cd.active_campaigns,
        cd.total_revenue,
        bd.total_scans
    FROM campaign_data cd, blookperks_data bd;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update vendor ratings
CREATE OR REPLACE FUNCTION update_vendor_rating(
    vendor_id UUID,
    new_rating DECIMAL
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.vendors
    SET 
        rating = (
            SELECT AVG(rating)
            FROM (
                SELECT rating
                FROM public.blookworks_jobs
                WHERE vendor_id = update_vendor_rating.vendor_id
                AND rating IS NOT NULL
                UNION ALL
                SELECT new_rating
            ) ratings
        ),
        total_jobs = total_jobs + 1,
        updated_at = NOW()
    WHERE id = vendor_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
