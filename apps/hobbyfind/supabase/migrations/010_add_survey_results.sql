-- Add survey result columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN survey_result_type TEXT,
ADD COLUMN survey_completed_at TIMESTAMP WITH TIME ZONE;

-- Create index for survey result queries
CREATE INDEX idx_profiles_survey_result ON public.profiles(survey_result_type);

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.survey_result_type IS '취미 유형 테스트 결과 (미술, 요리, 운동, 음악, 공예, 독서)';
COMMENT ON COLUMN public.profiles.survey_completed_at IS '취미 유형 테스트 완료 시간';
