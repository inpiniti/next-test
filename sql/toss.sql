-- 토스라는 테이블을 만들건데,
-- 필드는 stockCode, symbol 이렇게 두개로 할거야.
-- 디비는 postgreSQL을 사용할거야.

CREATE TABLE toss (
    stockCode VARCHAR(10) PRIMARY KEY,
    symbol VARCHAR(10)
);