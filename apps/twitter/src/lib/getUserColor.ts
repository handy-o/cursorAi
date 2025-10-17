/**
 * 사용자 ID 또는 이름을 기반으로 일관된 색상을 생성합니다.
 * 같은 사용자는 항상 같은 색상을 가집니다.
 */
export function getUserColor(identifier: string): string {
  // 미리 정의된 색상 팔레트 (실제 hex 색상)
  const colors = [
    '#3b82f6',      // 파란색
    '#10b981',      // 초록색
    '#8b5cf6',      // 보라색
    '#ec4899',      // 분홍색
    '#6366f1',      // 남색
    '#ef4444',      // 빨간색
    '#f97316',      // 주황색
    '#14b8a6',      // 청록색
    '#06b6d4',      // 하늘색
    '#eab308',      // 노란색
    '#f43f5e',      // 장미색
    '#7c3aed',      // 보라색 (다른 톤)
    '#d946ef',      // 자주색
    '#059669',      // 에메랄드
    '#84cc16',      // 라임
    '#f59e0b',      // 호박색
  ]

  // 문자열을 숫자로 변환 (해시 함수)
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 32비트 정수로 변환
  }

  // 절대값을 취하고 색상 배열 길이로 나눈 나머지를 인덱스로 사용
  const index = Math.abs(hash) % colors.length
  
  return colors[index]
}

/**
 * 사용자 이니셜을 반환합니다.
 */
export function getUserInitial(name?: string | null, email?: string | null): string {
  if (name && name.length > 0) {
    return name[0].toUpperCase()
  }
  if (email && email.length > 0) {
    return email[0].toUpperCase()
  }
  return 'U'
}

