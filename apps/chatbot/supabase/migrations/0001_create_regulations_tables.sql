-- 대분류 테이블
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 규정 테이블
CREATE TABLE IF NOT EXISTS regulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_regulations_category_id ON regulations(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_regulations_sort_order ON regulations(sort_order);

-- 샘플 데이터 삽입
INSERT INTO categories (name, description, sort_order) VALUES
  ('인사 규정', '채용, 근태, 평가 등 인사 관련 규정', 1),
  ('복리후생', '휴가, 경조사, 지원금 등 복리후생 관련 규정', 2),
  ('보안 규정', '정보보안, 개인정보보호 등 보안 관련 규정', 3),
  ('업무 규정', '출장, 구매, 지출 등 업무 관련 규정', 4);

-- 샘플 규정 데이터
INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '연차 사용 규정',
  '1. 입사 1년 후 15일의 연차가 부여됩니다.
2. 연차는 1일 또는 반일 단위로 사용 가능합니다.
3. 연차 사용 시 최소 1일 전 신청이 필요합니다.
4. 미사용 연차는 익년 3월까지 사용 가능하며, 이후 소멸됩니다.',
  1
FROM categories c WHERE c.name = '복리후생';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '재택근무 규정',
  '1. 주 2회까지 재택근무가 가능합니다.
2. 재택근무는 전날까지 팀장 승인이 필요합니다.
3. 재택근무 시 근무시간은 사무실 근무와 동일합니다.
4. 긴급 회의 시 출근 요청이 있을 수 있습니다.',
  2
FROM categories c WHERE c.name = '업무 규정';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '비밀번호 관리 규정',
  '1. 비밀번호는 8자리 이상, 영문/숫자/특수문자 조합이어야 합니다.
2. 3개월마다 비밀번호를 변경해야 합니다.
3. 이전 3개의 비밀번호는 재사용할 수 없습니다.
4. 비밀번호는 타인과 공유할 수 없습니다.',
  1
FROM categories c WHERE c.name = '보안 규정';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '개인정보 처리 규정',
  '1. 업무상 취득한 개인정보는 외부 유출을 금지합니다.
2. 개인정보가 포함된 문서는 암호화하여 보관합니다.
3. 개인정보 파기 시 복구 불가능하도록 처리합니다.
4. 개인정보 유출 발견 시 즉시 보안팀에 신고합니다.',
  2
FROM categories c WHERE c.name = '보안 규정';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '신입사원 온보딩',
  '1. 입사 첫날 인사팀에서 회사 소개 및 규정 교육을 진행합니다.
2. 1주일간 멘토가 배정되어 업무 적응을 지원합니다.
3. 3개월 수습 기간 후 정규직 전환 평가를 진행합니다.
4. 온보딩 기간 중 궁금한 사항은 인사팀으로 문의 가능합니다.',
  1
FROM categories c WHERE c.name = '인사 규정';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '경조사 휴가 및 지원',
  '1. 본인 결혼: 5일 유급휴가 및 50만원 지원
2. 직계가족 경조사: 3일 유급휴가
3. 출산: 배우자 5일 유급휴가 및 30만원 지원
4. 경조사 화환 또는 조의금 지원',
  3
FROM categories c WHERE c.name = '복리후생';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '출장 규정',
  '1. 국내 출장은 1주일 전, 해외 출장은 2주일 전 신청합니다.
2. 출장비는 실비 정산을 원칙으로 합니다.
3. 숙박비는 1박당 10만원 이내로 제한됩니다.
4. 출장 후 5일 이내 출장 보고서를 제출해야 합니다.',
  3
FROM categories c WHERE c.name = '업무 규정';

INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '성과 평가 규정',
  '1. 연 2회(상반기/하반기) 성과 평가를 진행합니다.
2. 평가 항목: 업무 성과(60%), 역량(30%), 태도(10%)
3. 평가 결과는 승진, 보상, 교육 기회에 반영됩니다.
4. 평가 결과에 이의가 있을 시 재평가를 요청할 수 있습니다.',
  2
FROM categories c WHERE c.name = '인사 규정';


