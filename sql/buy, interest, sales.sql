-- 구매목록 테이블 생성
CREATE TABLE buy (
    key SERIAL PRIMARY KEY,
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_buy_id ON buy(id);

-- 관심목록 테이블 생성
CREATE TABLE interest (
    key SERIAL PRIMARY KEY,
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL
);
CREATE INDEX idx_interest_id ON interest(id);

-- 판매기록 테이블 생성
CREATE TABLE sales (
    key SERIAL PRIMARY KEY,
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    buy_price DECIMAL(10, 2) NOT NULL,
    sales_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sales_id ON sales(id);