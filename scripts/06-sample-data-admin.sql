-- Sample data for testing admin dashboard features
-- This script creates realistic test data for all user roles and platform features

-- First, let's create sample users for different roles
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES 
  -- Admin users
  ('11111111-1111-1111-1111-111111111111', 'admin@blookmyspace.com', crypt('admin123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Admin User","role":"admin"}'),
  
  -- Space owners
  ('22222222-2222-2222-2222-222222222222', 'owner1@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '30 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Rajesh Kumar","role":"space_owner"}'),
  ('22222222-2222-2222-2222-222222222223', 'owner2@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '25 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Priya Sharma","role":"space_owner"}'),
  ('22222222-2222-2222-2222-222222222224', 'owner3@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '20 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Amit Singh","role":"space_owner"}'),
  ('22222222-2222-2222-2222-222222222225', 'owner4@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '15 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sunita Patel","role":"space_owner"}'),
  ('22222222-2222-2222-2222-222222222226', 'owner5@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '10 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Vikram Gupta","role":"space_owner"}'),
  
  -- Brand users
  ('33333333-3333-3333-3333-333333333333', 'brand1@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '28 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Coca Cola India","role":"brand"}'),
  ('33333333-3333-3333-3333-333333333334', 'brand2@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '22 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Samsung Electronics","role":"brand"}'),
  ('33333333-3333-3333-3333-333333333335', 'brand3@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '18 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Zomato","role":"brand"}'),
  ('33333333-3333-3333-3333-333333333336', 'brand4@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '12 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Flipkart","role":"brand"}'),
  
  -- Vendor users
  ('44444444-4444-4444-4444-444444444444', 'vendor1@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '26 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Tech Solutions Pvt Ltd","role":"vendor"}'),
  ('44444444-4444-4444-4444-444444444445', 'vendor2@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '21 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Creative Agency","role":"vendor"}'),
  ('44444444-4444-4444-4444-444444444446', 'vendor3@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '16 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Print Masters","role":"vendor"}'),
  
  -- BlookForce agents
  ('55555555-5555-5555-5555-555555555555', 'agent1@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '24 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Rohit Verma","role":"blookforce_agent"}'),
  ('55555555-5555-5555-5555-555555555556', 'agent2@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '19 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Neha Agarwal","role":"blookforce_agent"}'),
  ('55555555-5555-5555-5555-555555555557', 'agent3@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '14 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Arjun Malhotra","role":"blookforce_agent"}'),
  
  -- Some pending users for approval testing
  ('66666666-6666-6666-6666-666666666666', 'pending1@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '5 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Pending User 1","role":"space_owner"}'),
  ('66666666-6666-6666-6666-666666666667', 'pending2@example.com', crypt('password123', gen_salt('bf')), now(), now() - interval '3 days', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Pending User 2","role":"brand"}');

-- Create user profiles
INSERT INTO user_profiles (id, full_name, role, status, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin', 'active', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'Rajesh Kumar', 'space_owner', 'active', now() - interval '30 days', now()),
  ('22222222-2222-2222-2222-222222222223', 'Priya Sharma', 'space_owner', 'active', now() - interval '25 days', now()),
  ('22222222-2222-2222-2222-222222222224', 'Amit Singh', 'space_owner', 'active', now() - interval '20 days', now()),
  ('22222222-2222-2222-2222-222222222225', 'Sunita Patel', 'space_owner', 'active', now() - interval '15 days', now()),
  ('22222222-2222-2222-2222-222222222226', 'Vikram Gupta', 'space_owner', 'active', now() - interval '10 days', now()),
  ('33333333-3333-3333-3333-333333333333', 'Coca Cola India', 'brand', 'active', now() - interval '28 days', now()),
  ('33333333-3333-3333-3333-333333333334', 'Samsung Electronics', 'brand', 'active', now() - interval '22 days', now()),
  ('33333333-3333-3333-3333-333333333335', 'Zomato', 'brand', 'active', now() - interval '18 days', now()),
  ('33333333-3333-3333-3333-333333333336', 'Flipkart', 'brand', 'active', now() - interval '12 days', now()),
  ('44444444-4444-4444-4444-444444444444', 'Tech Solutions Pvt Ltd', 'vendor', 'active', now() - interval '26 days', now()),
  ('44444444-4444-4444-4444-444444444445', 'Creative Agency', 'vendor', 'active', now() - interval '21 days', now()),
  ('44444444-4444-4444-4444-444444444446', 'Print Masters', 'vendor', 'active', now() - interval '16 days', now()),
  ('55555555-5555-5555-5555-555555555555', 'Rohit Verma', 'blookforce_agent', 'active', now() - interval '24 days', now()),
  ('55555555-5555-5555-5555-555555555556', 'Neha Agarwal', 'blookforce_agent', 'active', now() - interval '19 days', now()),
  ('55555555-5555-5555-5555-555555555557', 'Arjun Malhotra', 'blookforce_agent', 'active', now() - interval '14 days', now()),
  ('66666666-6666-6666-6666-666666666666', 'Pending User 1', 'space_owner', 'pending', now() - interval '5 days', now()),
  ('66666666-6666-6666-6666-666666666667', 'Pending User 2', 'brand', 'pending', now() - interval '3 days', now());

-- Create space owners
INSERT INTO space_owners (id, user_id, company_name, contact_person, address, pincode, landmark, created_at)
VALUES 
  ('so1', '22222222-2222-2222-2222-222222222222', 'Kumar Enterprises', 'Rajesh Kumar', '123 MG Road, Bangalore', '560001', 'Near Metro Station', now() - interval '30 days'),
  ('so2', '22222222-2222-2222-2222-222222222223', 'Sharma Properties', 'Priya Sharma', '456 CP, New Delhi', '110001', 'Connaught Place', now() - interval '25 days'),
  ('so3', '22222222-2222-2222-2222-222222222224', 'Singh Spaces', 'Amit Singh', '789 Marine Drive, Mumbai', '400001', 'Near Gateway of India', now() - interval '20 days'),
  ('so4', '22222222-2222-2222-2222-222222222225', 'Patel Plaza', 'Sunita Patel', '321 SG Highway, Ahmedabad', '380015', 'Near ISCON Temple', now() - interval '15 days'),
  ('so5', '22222222-2222-2222-2222-222222222226', 'Gupta Mall', 'Vikram Gupta', '654 Park Street, Kolkata', '700016', 'Near Victoria Memorial', now() - interval '10 days');

-- Create spaces
INSERT INTO spaces (id, owner_id, name, space_type, address, city, state, pincode, space_size, footfall_weekday, footfall_weekend, age_group, income_segment, has_cameras, camera_count, camera_type, camera_accessible, photos, created_at)
VALUES 
  ('sp1', 'so1', 'MG Road Shopping Complex', 'mall', '123 MG Road, Bangalore', 'Bangalore', 'Karnataka', '560001', 5000, 2000, 3500, '18-35', 'middle_class', true, 12, 'IP Camera', true, '["space1_1.jpg", "space1_2.jpg"]', now() - interval '29 days'),
  ('sp2', 'so1', 'Tech Park Food Court', 'food_court', '125 MG Road, Bangalore', 'Bangalore', 'Karnataka', '560001', 1200, 800, 1200, '22-40', 'upper_middle', true, 6, 'CCTV', true, '["space2_1.jpg"]', now() - interval '28 days'),
  ('sp3', 'so2', 'CP Central Mall', 'mall', '456 CP, New Delhi', 'New Delhi', 'Delhi', '110001', 8000, 3000, 5000, '20-45', 'upper_middle', true, 20, 'IP Camera', true, '["space3_1.jpg", "space3_2.jpg", "space3_3.jpg"]', now() - interval '24 days'),
  ('sp4', 'so3', 'Marine Drive Plaza', 'retail_space', '789 Marine Drive, Mumbai', 'Mumbai', 'Maharashtra', '400001', 3000, 1500, 2500, '25-50', 'high_income', true, 8, 'IP Camera', true, '["space4_1.jpg"]', now() - interval '19 days'),
  ('sp5', 'so4', 'SG Highway Mall', 'mall', '321 SG Highway, Ahmedabad', 'Ahmedabad', 'Gujarat', '380015', 6000, 2200, 3800, '18-40', 'middle_class', true, 15, 'CCTV', true, '["space5_1.jpg", "space5_2.jpg"]', now() - interval '14 days'),
  ('sp6', 'so5', 'Park Street Market', 'market', '654 Park Street, Kolkata', 'Kolkata', 'West Bengal', '700016', 2500, 1000, 1800, '20-55', 'middle_class', true, 10, 'IP Camera', true, '["space6_1.jpg"]', now() - interval '9 days');

-- Create brands
INSERT INTO brands (id, user_id, brand_name, contact_person, industry_type, website, social_links, target_cities, budget_range, created_at)
VALUES 
  ('br1', '33333333-3333-3333-3333-333333333333', 'Coca Cola India', 'Marketing Manager', 'beverage', 'https://coca-cola.in', '["@cocacola_in", "facebook.com/cocacola"]', '["Mumbai", "Delhi", "Bangalore"]', '500000-1000000', now() - interval '28 days'),
  ('br2', '33333333-3333-3333-3333-333333333334', 'Samsung Electronics', 'Brand Manager', 'electronics', 'https://samsung.com/in', '["@samsung_india", "facebook.com/samsung"]', '["Mumbai", "Delhi", "Bangalore", "Chennai"]', '1000000-2000000', now() - interval '22 days'),
  ('br3', '33333333-3333-3333-3333-333333333335', 'Zomato', 'Growth Manager', 'food_delivery', 'https://zomato.com', '["@zomato", "facebook.com/zomato"]', '["Mumbai", "Delhi", "Bangalore", "Pune"]', '200000-500000', now() - interval '18 days'),
  ('br4', '33333333-3333-3333-3333-333333333336', 'Flipkart', 'Marketing Head', 'ecommerce', 'https://flipkart.com', '["@flipkart", "facebook.com/flipkart"]', '["Mumbai", "Delhi", "Bangalore", "Hyderabad"]', '800000-1500000', now() - interval '12 days');

-- Create campaigns
INSERT INTO campaigns (id, brand_id, space_id, name, description, campaign_type, start_date, end_date, budget, status, requirements, deliverables, created_at)
VALUES 
  ('c1', 'br1', 'sp1', 'Summer Refresh Campaign', 'Promote new summer flavors', 'brand_activation', '2024-01-15', '2024-02-15', 750000, 'completed', '{"display_duration": "30 days", "target_audience": "young adults"}', '["Digital displays", "Sampling booth", "Brand ambassadors"]', now() - interval '27 days'),
  ('c2', 'br2', 'sp3', 'Galaxy S24 Launch', 'New smartphone launch campaign', 'product_launch', '2024-01-20', '2024-02-20', 1200000, 'active', '{"display_duration": "30 days", "demo_units": 5}', '["Interactive displays", "Demo stations", "Technical support"]', now() - interval '21 days'),
  ('c3', 'br3', 'sp2', 'Food Festival Promotion', 'Promote food delivery during festival', 'seasonal', '2024-02-01', '2024-02-28', 300000, 'active', '{"qr_codes": true, "discount_offers": true}', '["QR code displays", "Promotional banners", "Discount coupons"]', now() - interval '17 days'),
  ('c4', 'br4', 'sp4', 'Big Billion Days Preview', 'Pre-sale campaign for BBD', 'promotional', '2024-02-10', '2024-03-10', 900000, 'active', '{"interactive_kiosks": true, "app_downloads": true}', '["Interactive kiosks", "App download incentives", "Product demos"]', now() - interval '11 days'),
  ('c5', 'br1', 'sp5', 'Coca Cola Zero Launch', 'Launch new zero sugar variant', 'product_launch', '2024-02-15', '2024-03-15', 600000, 'active', '{"sampling": true, "feedback_collection": true}', '["Sampling stations", "Feedback kiosks", "Brand displays"]', now() - interval '6 days');

-- Create BlookPerks campaigns
INSERT INTO blookperks_campaigns (id, space_id, name, description, campaign_type, start_date, end_date, rewards, qr_code, terms_conditions, status, total_scans, total_engagements, total_redemptions, created_at)
VALUES 
  ('bp1', 'sp1', 'Shopping Rewards', 'Earn points for shopping', 'loyalty', '2024-01-10', '2024-03-10', '{"points_per_visit": 10, "bonus_weekend": 20}', 'BMS-1705123456789-abc123def', 'Valid for 60 days', 'active', 1250, 890, 234, now() - interval '26 days'),
  ('bp2', 'sp2', 'Food Court Deals', 'Special discounts on food', 'discount', '2024-01-15', '2024-02-28', '{"discount_percentage": 15, "min_order": 500}', 'BMS-1705234567890-def456ghi', 'Valid on weekdays only', 'active', 890, 623, 187, now() - interval '23 days'),
  ('bp3', 'sp3', 'Mall Walker Rewards', 'Rewards for frequent visitors', 'loyalty', '2024-01-20', '2024-04-20', '{"daily_points": 5, "weekly_bonus": 50}', 'BMS-1705345678901-ghi789jkl', 'Valid for registered users', 'active', 2100, 1456, 412, now() - interval '20 days'),
  ('bp4', 'sp4', 'Premium Shopping', 'Exclusive offers for premium shoppers', 'exclusive', '2024-02-01', '2024-03-31', '{"cashback_percentage": 5, "min_purchase": 2000}', 'BMS-1705456789012-jkl012mno', 'Valid for premium members', 'active', 567, 398, 89, now() - interval '15 days'),
  ('bp5', 'sp5', 'Festival Special', 'Special rewards during festivals', 'seasonal', '2024-02-05', '2024-03-05', '{"bonus_multiplier": 2, "special_gifts": true}', 'BMS-1705567890123-mno345pqr', 'Valid during festival period', 'active', 1890, 1323, 298, now() - interval '12 days');

-- Create QR scans for analytics
INSERT INTO qr_scans (id, campaign_id, user_agent, ip_address, location, engaged, redeemed, created_at)
SELECT 
  gen_random_uuid(),
  (ARRAY['bp1', 'bp2', 'bp3', 'bp4', 'bp5'])[floor(random() * 5 + 1)],
  'Mozilla/5.0 (Mobile; Android)',
  '192.168.1.' || floor(random() * 255 + 1)::text,
  '{"city": "' || (ARRAY['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'])[floor(random() * 5 + 1)] || '"}',
  random() > 0.3,
  random() > 0.7,
  now() - (random() * interval '30 days')
FROM generate_series(1, 1000);

-- Create subscriptions for revenue tracking
INSERT INTO subscriptions (id, user_id, plan_type, status, amount, start_date, end_date, payment_id, created_at)
VALUES 
  ('sub1', '22222222-2222-2222-2222-222222222222', 'pro', 'active', 2999, '2024-01-01', '2024-04-01', 'pay_1234567890', now() - interval '30 days'),
  ('sub2', '22222222-2222-2222-2222-222222222223', 'basic', 'active', 999, '2024-01-05', '2024-04-05', 'pay_2345678901', now() - interval '25 days'),
  ('sub3', '22222222-2222-2222-2222-222222222224', 'enterprise', 'active', 9999, '2024-01-10', '2024-04-10', 'pay_3456789012', now() - interval '20 days'),
  ('sub4', '33333333-3333-3333-3333-333333333333', 'pro', 'active', 2999, '2024-01-12', '2024-04-12', 'pay_4567890123', now() - interval '18 days'),
  ('sub5', '33333333-3333-3333-3333-333333333334', 'enterprise', 'active', 9999, '2024-01-15', '2024-04-15', 'pay_5678901234', now() - interval '15 days'),
  ('sub6', '44444444-4444-4444-4444-444444444444', 'basic', 'active', 999, '2024-01-18', '2024-04-18', 'pay_6789012345', now() - interval '12 days'),
  ('sub7', '55555555-5555-5555-5555-555555555555', 'pro', 'active', 2999, '2024-01-20', '2024-04-20', 'pay_7890123456', now() - interval '10 days'),
  ('sub8', '22222222-2222-2222-2222-222222222225', 'basic', 'expired', 999, '2023-12-01', '2024-03-01', 'pay_8901234567', now() - interval '35 days'),
  ('sub9', '33333333-3333-3333-3333-333333333335', 'pro', 'cancelled', 2999, '2024-01-08', '2024-04-08', 'pay_9012345678', now() - interval '22 days');

-- Create BlookForce agents and referrals
INSERT INTO blookforce_agents (id, user_id, agent_code, total_referrals, total_commission, commission_rate, status, created_at)
VALUES 
  ('bf1', '55555555-5555-5555-5555-555555555555', 'BF001', 12, 15000, 0.10, 'active', now() - interval '24 days'),
  ('bf2', '55555555-5555-5555-5555-555555555556', 'BF002', 8, 9500, 0.10, 'active', now() - interval '19 days'),
  ('bf3', '55555555-5555-5555-5555-555555555557', 'BF003', 15, 18750, 0.10, 'active', now() - interval '14 days');

-- Create referrals
INSERT INTO referrals (id, agent_id, referred_user_id, referral_type, commission_amount, status, created_at)
VALUES 
  ('ref1', 'bf1', '22222222-2222-2222-2222-222222222222', 'space_owner', 1500, 'paid', now() - interval '23 days'),
  ('ref2', 'bf1', '33333333-3333-3333-3333-333333333333', 'brand', 1200, 'paid', now() - interval '20 days'),
  ('ref3', 'bf2', '22222222-2222-2222-2222-222222222223', 'space_owner', 1500, 'paid', now() - interval '18 days'),
  ('ref4', 'bf3', '44444444-4444-4444-4444-444444444444', 'vendor', 800, 'pending', now() - interval '15 days'),
  ('ref5', 'bf1', '22222222-2222-2222-2222-222222222224', 'space_owner', 1500, 'paid', now() - interval '12 days');

-- Create vendors and jobs for BlookWorks
INSERT INTO vendors (id, user_id, company_name, service_type, experience_years, portfolio_url, hourly_rate, availability_status, rating, total_jobs_completed, created_at)
VALUES 
  ('v1', '44444444-4444-4444-4444-444444444444', 'Tech Solutions Pvt Ltd', 'digital_marketing', 5, 'https://techsolutions.com/portfolio', 2500, 'available', 4.8, 23, now() - interval '26 days'),
  ('v2', '44444444-4444-4444-4444-444444444445', 'Creative Agency', 'design', 7, 'https://creativeagency.com/work', 3000, 'available', 4.9, 31, now() - interval '21 days'),
  ('v3', '44444444-4444-4444-4444-444444444446', 'Print Masters', 'printing', 10, 'https://printmasters.com/gallery', 1500, 'busy', 4.7, 45, now() - interval '16 days');

-- Create jobs
INSERT INTO jobs (id, posted_by, vendor_id, title, description, job_type, budget, status, deadline, requirements, created_at)
VALUES 
  ('j1', '22222222-2222-2222-2222-222222222222', 'v1', 'Digital Campaign Setup', 'Setup digital displays for mall campaign', 'installation', 25000, 'completed', '2024-02-01', '{"experience": "2+ years", "tools": "digital display systems"}', now() - interval '25 days'),
  ('j2', '33333333-3333-3333-3333-333333333333', 'v2', 'Brand Identity Design', 'Create brand materials for campaign', 'design', 45000, 'in_progress', '2024-02-28', '{"software": "Adobe Creative Suite", "experience": "5+ years"}', now() - interval '20 days'),
  ('j3', '22222222-2222-2222-2222-222222222223', 'v3', 'Banner Printing', 'Print promotional banners for mall', 'printing', 15000, 'completed', '2024-02-15', '{"material": "vinyl", "size": "large format"}', now() - interval '18 days'),
  ('j4', '33333333-3333-3333-3333-333333333334', 'v1', 'Interactive Kiosk Setup', 'Install and configure interactive kiosks', 'installation', 35000, 'active', '2024-03-01', '{"hardware": "touch screens", "software": "kiosk management"}', now() - interval '15 days');

-- Create admin activity logs
INSERT INTO admin_logs (id, admin_id, action, target_type, target_id, details, created_at)
VALUES 
  ('log1', '11111111-1111-1111-1111-111111111111', 'user_activated', 'user', '22222222-2222-2222-2222-222222222222', '{"previous_status": "pending", "new_status": "active"}', now() - interval '29 days'),
  ('log2', '11111111-1111-1111-1111-111111111111', 'campaign_approved', 'campaign', 'c1', '{"campaign_name": "Summer Refresh Campaign", "budget": 750000}', now() - interval '27 days'),
  ('log3', '11111111-1111-1111-1111-111111111111', 'user_activated', 'user', '33333333-3333-3333-3333-333333333333', '{"previous_status": "pending", "new_status": "active"}', now() - interval '28 days'),
  ('log4', '11111111-1111-1111-1111-111111111111', 'subscription_updated', 'subscription', 'sub8', '{"action": "expired", "plan": "basic"}', now() - interval '5 days');

-- Update campaign analytics
UPDATE blookperks_campaigns 
SET 
  total_scans = (SELECT COUNT(*) FROM qr_scans WHERE campaign_id = blookperks_campaigns.id),
  total_engagements = (SELECT COUNT(*) FROM qr_scans WHERE campaign_id = blookperks_campaigns.id AND engaged = true),
  total_redemptions = (SELECT COUNT(*) FROM qr_scans WHERE campaign_id = blookperks_campaigns.id AND redeemed = true);

-- Create some system health metrics
INSERT INTO system_metrics (id, metric_name, metric_value, metric_type, recorded_at)
VALUES 
  ('sm1', 'server_uptime', '99.9', 'percentage', now()),
  ('sm2', 'api_response_time', '120', 'milliseconds', now()),
  ('sm3', 'database_connections', '45', 'count', now()),
  ('sm4', 'active_sessions', '234', 'count', now()),
  ('sm5', 'error_rate', '0.1', 'percentage', now());
