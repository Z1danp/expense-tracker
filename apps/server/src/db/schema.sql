-- 1. Tambahan kolom preferensi pada USERS
CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(255) NOT NULL,
    email               VARCHAR(255) UNIQUE NOT NULL,
    password_hash       VARCHAR(255) NOT NULL,
    payday_date         SMALLINT NOT NULL DEFAULT 1 CHECK (payday_date BETWEEN 1 AND 31),
    alert_threshold     SMALLINT NOT NULL DEFAULT 80 CHECK (alert_threshold BETWEEN 1 AND 100),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ACCOUNTS (Tetap, sudah sesuai)
CREATE TABLE accounts (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                VARCHAR(255) NOT NULL,
    balance             BIGINT NOT NULL DEFAULT 0,
    type                VARCHAR(20) NOT NULL CHECK(type IN ('tunai', 'bank', 'e-wallet')),
    is_active           BOOLEAN NOT NULL DEFAULT true,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CATEGORIES (Tetap, sudah solid)
CREATE TABLE categories (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                VARCHAR(255) NOT NULL,
    type                VARCHAR(20) NOT NULL CHECK(type IN ('expense', 'income')),
    is_active           BOOLEAN NOT NULL DEFAULT true,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_categories_id_type UNIQUE (id, type)
);

-- 4. BUDGETS (Disesuaikan untuk awal siklus gajian)
CREATE TABLE budgets (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id         UUID NOT NULL,
    category_type       VARCHAR(20) NOT NULL DEFAULT 'expense' CHECK (category_type = 'expense'),
    limit_amount        BIGINT NOT NULL,
    cycle_start_date    DATE NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_budgets_category_expense
        FOREIGN KEY (category_id, category_type)
        REFERENCES categories(id, type)
        ON DELETE CASCADE,
    
    CONSTRAINT uq_user_category_cycle
        UNIQUE(user_id, category_id, cycle_start_date)
);

-- 5. TRANSACTIONS (Mendukung Spend, Loot, dan Shift)
CREATE TABLE transactions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                VARCHAR(20) NOT NULL CHECK (type IN ('expense', 'income', 'transfer')),
    
    -- Sumber dana (wajib untuk semua tipe)
    account_id          UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
    
    -- Tujuan transfer (hanya terisi jika type = 'transfer')
    to_account_id       UUID REFERENCES accounts(id) ON DELETE RESTRICT,
    
    -- Kategori (wajib untuk expense & income, null untuk transfer)
    category_id         UUID REFERENCES categories(id) ON DELETE RESTRICT,
    
    amount              BIGINT NOT NULL CHECK (amount > 0),
    fee                 BIGINT NOT NULL DEFAULT 0,
    title               VARCHAR(255) NOT NULL,
    date                DATE NOT NULL,
    notes               TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Integritas data transfer vs kategori
    CONSTRAINT chk_transaction_transfer_rules CHECK (
        (type = 'transfer' AND to_account_id IS NOT NULL AND category_id IS NULL) OR
        (type IN ('expense', 'income') AND to_account_id IS NULL AND category_id IS NOT NULL)
    )
);

-- Indexing Tambahan
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX idx_transactions_user_type ON transactions(user_id, type);
CREATE INDEX idx_budgets_user_cycle ON budgets(user_id, cycle_start_date);