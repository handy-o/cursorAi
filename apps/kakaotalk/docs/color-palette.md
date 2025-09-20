# 🎨 KakaoTalk Chat 컬러 팔레트

카카오톡 디자인 시스템을 기반으로 한 채팅 애플리케이션용 컬러 팔레트입니다.

## 📋 컬러 시스템 개요

**Triadic 기반 (Primary: Yellow 계열, Secondary/Accent은 보색 배치)**

| 역할                | 컬러 코드     | Tailwind 변수        | 설명                       |
| ----------------- | --------- | ------------------ | ------------------------ |
| **Primary 500**   | `#FEE500` | `bg-primary-500`   | 브랜드 핵심 색상 (카카오 노랑)       |
| **Primary 700**   | `#C9B600` | `bg-primary-700`   | Hover/Active 시 강조        |
| **Secondary 500** | `#00AEEF` | `bg-secondary-500` | 시원하고 경쾌한 보조 색 (블루 계열)    |
| **Accent 500**    | `#8BC34A` | `bg-accent-500`    | 친근함과 생동감을 주는 포인트 (그린 계열) |
| **Neutral 900**   | `#1C1C1C` | `text-neutral-900` | 텍스트 기본 (가독성 높은 블랙)       |
| **Neutral 500**   | `#757575` | `text-neutral-500` | 시간 표시/부가 정보              |
| **Neutral 100**   | `#FAFAFA` | `bg-neutral-100`   | 배경용 (밝은 톤, 눈의 피로 완화)     |

---

## 🎯 채팅 애플리케이션 사용 가이드라인

### Primary (Primary 500: #FEE500)
- **용도**: 메인 액션 버튼, 중요 메시지 강조, 브랜드 요소
- **채팅에서 사용 예시**: 
  - "메시지 보내기" 버튼
  - 새 메시지 알림 배지
  - 활성 상태 표시
- **Hover**: Primary 700 (#C9B600) 사용

### Secondary (Secondary 500: #00AEEF)
- **용도**: 보조 액션, 링크, 정보 표시
- **채팅에서 사용 예시**:
  - 첨부파일 아이콘
  - 프로필 설정 버튼
  - 부가 정보 텍스트
- **특징**: 신뢰감과 안정감을 주는 색상

### Accent (Accent 500: #8BC34A)
- **용도**: 성공 상태, 특별한 강조, 포인트 요소
- **채팅에서 사용 예시**:
  - 메시지 전송 완료 표시
  - 온라인 상태 표시
  - 특별한 기능 강조
- **특징**: 자연스럽고 친근한 느낌

### Neutral 계열
- **Neutral 900**: 채팅 메시지 텍스트, 제목
- **Neutral 500**: 시간 표시, 메타 정보
- **Neutral 100**: 채팅 배경, 카드 배경

---

## 🔧 Tailwind CSS 사용법

### 기본 클래스
```css
/* Primary */
.bg-primary-500    /* #FEE500 */
.bg-primary-700    /* #C9B600 */
.text-primary-500  /* #FEE500 */

/* Secondary */
.bg-secondary-500  /* #00AEEF */
.text-secondary-500 /* #00AEEF */

/* Accent */
.bg-accent-500     /* #8BC34A */
.text-accent-500   /* #8BC34A */

/* Neutral */
.text-neutral-900  /* #1C1C1C */
.text-neutral-500  /* #757575 */
.bg-neutral-100    /* #FAFAFA */
```

### CSS 변수 사용 (shadcn/ui 호환)
```css
/* Primary */
bg-primary          /* var(--primary) */
text-primary-foreground /* var(--primary-foreground) */

/* Secondary */
bg-secondary        /* var(--secondary) */
text-secondary-foreground /* var(--secondary-foreground) */

/* Accent */
bg-accent           /* var(--accent) */
text-accent-foreground /* var(--accent-foreground) */
```

---

## 💬 채팅 UI 컴포넌트 예시

### 메시지 입력창
```tsx
<div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4">
  <div className="flex items-center space-x-2">
    <input 
      className="flex-1 bg-transparent text-neutral-900 placeholder-neutral-500"
      placeholder="메시지를 입력하세요..."
    />
    <Button className="bg-primary-500 hover:bg-primary-700 text-neutral-900">
      <Send className="w-4 h-4" />
    </Button>
  </div>
</div>
```

### 메시지 버블
```tsx
{/* 내 메시지 */}
<div className="flex justify-end mb-2">
  <div className="bg-primary-500 text-neutral-900 rounded-lg p-3 max-w-xs">
    <p>안녕하세요! 어떻게 지내세요?</p>
    <span className="text-xs text-neutral-500">오후 2:30</span>
  </div>
</div>

{/* 상대방 메시지 */}
<div className="flex justify-start mb-2">
  <div className="bg-white border border-neutral-200 text-neutral-900 rounded-lg p-3 max-w-xs">
    <p>안녕하세요! 잘 지내고 있어요.</p>
    <span className="text-xs text-neutral-500">오후 2:31</span>
  </div>
</div>
```

### 채팅 헤더
```tsx
<div className="bg-white border-b border-neutral-200 p-4">
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold">김</span>
    </div>
    <div>
      <h3 className="text-neutral-900 font-semibold">김철수</h3>
      <p className="text-neutral-500 text-sm">온라인</p>
    </div>
  </div>
</div>
```

### 사이드바 메뉴
```tsx
<nav className="bg-white border-r border-neutral-200 w-64">
  <div className="p-4 border-b border-neutral-200">
    <Button className="w-full bg-primary-500 hover:bg-primary-700 text-neutral-900">
      새 채팅 시작
    </Button>
  </div>
  
  <div className="p-2">
    {chats.map((chat) => (
      <div 
        key={chat.id}
        className="p-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
      >
        <h4 className="text-neutral-900 font-medium">{chat.name}</h4>
        <p className="text-neutral-500 text-sm">{chat.lastMessage}</p>
        <span className="text-neutral-500 text-xs">{chat.time}</span>
      </div>
    ))}
  </div>
</nav>
```

---

## 🎨 채팅 특화 색상 조합

### 메시지 상태 표시
```tsx
{/* 메시지 전송 상태 */}
<div className="flex items-center space-x-1">
  <span className="text-neutral-500 text-xs">오후 2:30</span>
  <Check className="w-3 h-3 text-neutral-500" /> {/* 전송됨 */}
  <Check className="w-3 h-3 text-accent-500" />  {/* 읽음 */}
</div>

{/* 타이핑 인디케이터 */}
<div className="flex items-center space-x-1">
  <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" />
  <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce delay-100" />
  <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce delay-200" />
  <span className="text-neutral-500 text-sm">상대방이 입력 중...</span>
</div>
```

---

## 🌙 다크 모드 고려사항

채팅 애플리케이션의 다크 모드에서는 다음 사항을 고려해야 합니다:

- **배경**: 어두운 회색 톤 사용
- **메시지 버블**: 대비를 위해 색상 조정 필요
- **텍스트**: 가독성을 위해 밝은 색상 사용
- **Primary**: 브랜드 아이덴티티 유지

---

## 📱 접근성 고려사항

- **대비비**: WCAG AA 기준 준수 (4.5:1 이상)
- **색맹 고려**: 색상만으로 상태를 구분하지 않고 아이콘과 텍스트 병행
- **텍스트 가독성**: 채팅 메시지의 가독성 최우선
- **포커스 표시**: 키보드 네비게이션을 위한 명확한 포커스 표시

---

## 🔄 업데이트 히스토리

- **v1.0** (2024-01-XX): 카카오톡 디자인 시스템 기반 초기 컬러 팔레트 설계
- **v1.1** (2024-01-XX): 채팅 UI 특화 색상 조합 및 사용 예시 추가
- **v1.2** (2024-01-XX): Tailwind CSS 통합 및 shadcn/ui 호환성 확보
