-- migrate:up

CREATE TABLE accounts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    institution VARCHAR(255),
    balance NUMERIC(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    plaid_item_id UUID DEFAULT NULL,
    plaid_account_id UUID DEFAULT NULL,
    import_source VARCHAR(255) DEFAULT NULL
);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    account_id BIGINT NOT NULL REFERENCES accounts(id),
    amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL CHECK (status IN ('pending', 'posted', 'void')),
    description TEXT DEFAULT NULL,
    posted_at TIMESTAMP NOT NULL,
    authorized_at TIMESTAMP DEFAULT NULL,
    merchant_name VARCHAR(255) DEFAULT NULL,
    category_id BIGINT REFERENCES categories(id),
    external_id UUID DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    import_source VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- migrate:down

DROP TABLE transactions;
DROP TABLE categories;
DROP TABLE accounts;
