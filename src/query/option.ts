/**
 * 기본 옵션 설정 객체입니다.
 *
 * @property {boolean} retry - 재시도 여부를 설정합니다.
 * @property {number} staleTime - 데이터가 오래된 것으로 간주되는 시간을 설정합니다.
 *
 * Defaults to 5 * 60 * 1000 (5 minutes) or Infinity during SSR
 * The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
 * Note: the maximum allowed time is about 24 days. See more.
 * If set to Infinity, will disable garbage collection
 */
export const basic = {
  enabled: true, // 쿼리 활성화 여부
  retry: false, // 실패한 경우 자동 재시도 설정
  //staleTime: 1000 * 60 * 60, // 1 시간동안은 신선하다고 생각함
};
