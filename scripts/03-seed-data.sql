-- Insert sample users (these would normally be created through Supabase Auth)
-- Note: In production, users are created through the auth system

-- Insert sample space types and categories for reference
CREATE TABLE IF NOT EXISTS public.space_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

INSERT INTO public.space_types (name, description) VALUES
('rwa', 'Residential Welfare Association / Housing Society'),
('retail', 'Retail Store'),
('mall', 'Shopping Mall'),
('gym', 'Fitness Center / Gym'),
('salon', 'Beauty Salon / Spa'),
('restaurant', 'Restaurant'),
('cafe', 'Café / Coffee Shop'),
('clinic', 'Medical Clinic'),
('hospital', 'Hospital'),
('coworking', 'Co-working Space'),
('corporate', 'Corporate Office / Park'),
('banquet', 'Banquet Hall / Event Space');

-- Insert sample service categories for vendors
CREATE TABLE IF NOT EXISTS public.service_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

INSERT INTO public.service_categories (name, description) VALUES
('printing', 'Printing Services - Posters, Banners, Flyers'),
('fabrication', 'Fabrication - Custom Displays, Standees'),
('installation', 'Installation Services - Setup and Mounting'),
('digital_display', 'Digital Display Management'),
('event_management', 'Event Planning and Management'),
('photography', 'Photography and Videography'),
('design', 'Graphic Design and Creative Services');

-- Insert sample cities
CREATE TABLE IF NOT EXISTS public.cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state TEXT NOT NULL
);

INSERT INTO public.cities (name, state) VALUES
('Mumbai', 'Maharashtra'),
('Delhi', 'Delhi'),
('Bangalore', 'Karnataka'),
('Hyderabad', 'Telangana'),
('Chennai', 'Tamil Nadu'),
('Kolkata', 'West Bengal'),
('Pune', 'Maharashtra'),
('Ahmedabad', 'Gujarat'),
('Jaipur', 'Rajasthan'),
('Lucknow', 'Uttar Pradesh');
