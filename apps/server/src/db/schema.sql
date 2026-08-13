CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accounts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    balance         BIGINT NOT NULL DEFAULT 0,
    type            VARCHAR(20) NOT NULL CHECK(type IN ('tunai', 'bank', 'e-wallet')),
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(20) NOT NULL CHECK(type IN ('expense', 'income')),
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- constraint
    CONSTRAINT uq_categories_id_type UNIQUE (id, type)
);

CREATE TABLE budgets (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id     UUID NOT NULL,
    category_type   VARCHAR(20) NOT NULL DEFAULT 'expense' CHECK (category_type = 'expense'),
    limit_amount    BIGINT NOT NULL,
    date            DATE NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- constraint key gabungan
    CONSTRAINT fk_budgets_category_expense
        FOREIGN KEY (category_id, category_type)
        REFERENCES categories(id, type)
        ON DELETE CASCADE,
    
    CONSTRAINT uq_user_category_date
        UNIQUE(user_id, category_id, date)
);

CREATE TABLE transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
    category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    amount          BIGINT NOT NULL,
    title           VARCHAR(255) NOT NULL,
    date            DATE NOT NULL,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing untuk Performa Query
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX idx_budgets_user_date ON budgets(user_id, date);