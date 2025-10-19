-- Insert sample categories
INSERT INTO public.categories (name, slug, icon, description, sort_order) VALUES
('미술', 'art', '🎨', '드로잉, 페인팅, 조각 등 다양한 미술 활동', 1),
('요리', 'cooking', '👨‍🍳', '다양한 요리와 베이킹 클래스', 2),
('운동', 'exercise', '🏃‍♀️', '피트니스, 요가, 수영 등 운동 활동', 3),
('음악', 'music', '🎵', '악기 연주, 보컬, 작곡 등 음악 활동', 4),
('공예', 'craft', '✂️', '핸드메이드, 도자기, 목공예 등', 5),
('독서', 'reading', '📚', '독서 모임, 토론, 작문 등', 6);

-- Insert sample hobbies
INSERT INTO public.hobbies (
  title, description, category_id, location, price, original_price,
  rating, review_count, max_participants, duration, difficulty,
  materials, instructor_name, instructor_info, contact_phone, contact_email
) VALUES
(
  '수채화 드로잉 클래스',
  '수채화의 기본부터 고급 기법까지 단계별로 학습할 수 있는 클래스입니다. 물감의 특성을 이해하고, 다양한 브러시 기법을 익히며, 나만의 작품을 완성해보세요. 초보자도 쉽게 따라할 수 있도록 친절하게 지도해드립니다.',
  (SELECT id FROM public.categories WHERE slug = 'art'),
  '강남구 테헤란로 123',
  50000,
  70000,
  4.8,
  127,
  12,
  '2시간',
  '초급',
  ARRAY['수채화 물감', '브러시 세트', '수채화지', '팔레트', '물통'],
  '김예술',
  '홍익대학교 미술대학 졸업, 10년 경력의 전문 강사',
  '010-1234-5678',
  'art@example.com'
),
(
  '홈베이킹 클래스',
  '집에서도 쉽게 만들 수 있는 다양한 빵과 쿠키를 배우는 클래스입니다. 기본 반죽법부터 장식 기법까지 차근차근 알려드립니다.',
  (SELECT id FROM public.categories WHERE slug = 'cooking'),
  '서초구 강남대로 456',
  35000,
  null,
  4.9,
  89,
  8,
  '3시간',
  '초급',
  ARRAY['밀가루', '이스트', '설탕', '버터', '계란'],
  '박베이킹',
  '파리 블루 셰프 학교 졸업, 8년 경력',
  '010-2345-6789',
  'baking@example.com'
),
(
  '요가 & 명상',
  '스트레스 해소와 몸의 유연성을 기르는 요가 클래스입니다. 초보자도 쉽게 따라할 수 있는 기본 동작부터 시작합니다.',
  (SELECT id FROM public.categories WHERE slug = 'exercise'),
  '마포구 홍대입구역 789',
  40000,
  null,
  4.7,
  156,
  15,
  '1시간 30분',
  '초급',
  ARRAY['요가 매트', '타월', '물병'],
  '이요가',
  '국제 요가 연맹 인증 강사, 12년 경력',
  '010-3456-7890',
  'yoga@example.com'
),
(
  '플라워 아레인지먼트',
  '아름다운 꽃꽂이 기법을 배우는 클래스입니다. 계절별 꽃을 활용한 다양한 스타일의 꽃꽂이를 배워보세요.',
  (SELECT id FROM public.categories WHERE slug = 'craft'),
  '송파구 올림픽공원 101',
  45000,
  55000,
  4.6,
  73,
  10,
  '2시간 30분',
  '중급',
  ARRAY['꽃가위', '플로랄 폼', '꽃잎', '리본'],
  '최플라워',
  '네덜란드 플로리스트 학교 졸업, 15년 경력',
  '010-4567-8901',
  'flower@example.com'
);

-- Insert sample hobby images
INSERT INTO public.hobby_images (hobby_id, image_url, sort_order) VALUES
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), 'https://picsum.photos/800/600?random=1', 1),
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), 'https://picsum.photos/800/600?random=11', 2),
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), 'https://picsum.photos/800/600?random=12', 3),
((SELECT id FROM public.hobbies WHERE title = '홈베이킹 클래스'), 'https://picsum.photos/800/600?random=2', 1),
((SELECT id FROM public.hobbies WHERE title = '홈베이킹 클래스'), 'https://picsum.photos/800/600?random=21', 2),
((SELECT id FROM public.hobbies WHERE title = '요가 & 명상'), 'https://picsum.photos/800/600?random=3', 1),
((SELECT id FROM public.hobbies WHERE title = '플라워 아레인지먼트'), 'https://picsum.photos/800/600?random=4', 1);

-- Insert sample hobby schedules
INSERT INTO public.hobby_schedules (hobby_id, schedule_date, start_time, end_time, max_participants, current_participants) VALUES
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), '2024-04-15', '14:00', '16:00', 12, 9),
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), '2024-04-22', '14:00', '16:00', 12, 5),
((SELECT id FROM public.hobbies WHERE title = '수채화 드로잉 클래스'), '2024-04-29', '14:00', '16:00', 12, 3),
((SELECT id FROM public.hobbies WHERE title = '홈베이킹 클래스'), '2024-04-16', '10:00', '13:00', 8, 6),
((SELECT id FROM public.hobbies WHERE title = '홈베이킹 클래스'), '2024-04-23', '10:00', '13:00', 8, 2),
((SELECT id FROM public.hobbies WHERE title = '요가 & 명상'), '2024-04-17', '19:00', '20:30', 15, 12),
((SELECT id FROM public.hobbies WHERE title = '요가 & 명상'), '2024-04-24', '19:00', '20:30', 15, 8),
((SELECT id FROM public.hobbies WHERE title = '플라워 아레인지먼트'), '2024-04-18', '15:00', '17:30', 10, 7);

-- Insert sample events
INSERT INTO public.events (title, description, event_date, start_time, end_time, price, location, image_url, max_participants, current_participants) VALUES
(
  '봄맞이 특강: 신선한 꽃꽂이',
  '봄의 신선한 꽃들로 특별한 꽃꽂이 작품을 만들어보세요. 전문 강사가 1:1로 지도해드립니다.',
  '2024-04-15',
  '14:00',
  '16:00',
  35000,
  '강남구 플라워 스튜디오',
  'https://picsum.photos/400/250?random=5',
  20,
  15
),
(
  '집중력 향상 미술 치료',
  '미술 활동을 통해 집중력과 창의력을 기르는 특별한 치료 프로그램입니다.',
  '2024-04-20',
  '10:00',
  '12:00',
  45000,
  '서초구 아트 센터',
  'https://picsum.photos/400/250?random=6',
  15,
  8
),
(
  '나만의 도자기 만들기',
  '흙을 만지며 나만의 도자기를 만들어보세요. 완성된 작품은 가져가실 수 있습니다.',
  '2024-04-25',
  '15:00',
  '18:00',
  55000,
  '마포구 도예 공방',
  'https://picsum.photos/400/250?random=7',
  12,
  5
);

-- Insert sample reviews
INSERT INTO public.reviews (user_id, hobby_id, rating, comment) VALUES
-- Note: These will be inserted when we have actual user profiles
-- For now, we'll create some sample reviews without user_id (which will need to be updated later)
-- You can run these after creating user accounts


