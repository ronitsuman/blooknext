-- Add document fields to blookforce_agents table
ALTER TABLE blookforce_agents 
ADD COLUMN IF NOT EXISTS aadhaar_number VARCHAR(12),
ADD COLUMN IF NOT EXISTS aadhaar_document_url TEXT,
ADD COLUMN IF NOT EXISTS selfie_photo_url TEXT,
ADD COLUMN IF NOT EXISTS documents_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS verification_notes TEXT;

-- Update status enum to include document verification states
ALTER TABLE blookforce_agents 
ALTER COLUMN status TYPE VARCHAR(20);

-- Add check constraint for status
ALTER TABLE blookforce_agents 
ADD CONSTRAINT check_blookforce_status 
CHECK (status IN ('pending', 'documents_pending', 'verified', 'active', 'inactive', 'rejected'));

-- Create index for faster document verification queries
CREATE INDEX IF NOT EXISTS idx_blookforce_documents_verified 
ON blookforce_agents(documents_verified);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_blookforce_status 
ON blookforce_agents(status);
