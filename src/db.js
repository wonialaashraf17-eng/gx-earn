import pg from "pg";
const {Pool}=pg;
if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
export const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:false}:false,max:5});
export async function initDb(){await pool.query(`
CREATE TABLE IF NOT EXISTS users(id BIGSERIAL PRIMARY KEY,name VARCHAR(70) NOT NULL,email VARCHAR(190) UNIQUE NOT NULL,password_hash TEXT NOT NULL,referral_code VARCHAR(20) UNIQUE NOT NULL,referred_by BIGINT REFERENCES users(id),is_active BOOLEAN NOT NULL DEFAULT TRUE,admin_enabled BOOLEAN NOT NULL DEFAULT FALSE,created_at TIMESTAMPTZ DEFAULT NOW());
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS admin_enabled BOOLEAN NOT NULL DEFAULT FALSE;
CREATE TABLE IF NOT EXISTS tasks(id BIGSERIAL PRIMARY KEY,title VARCHAR(120) NOT NULL,description VARCHAR(1000) NOT NULL,category VARCHAR(30) DEFAULT 'sponsored',reward_ugx INTEGER NOT NULL CHECK(reward_ugx>=0),sponsor_name VARCHAR(120) NOT NULL,is_funded BOOLEAN DEFAULT FALSE,is_active BOOLEAN DEFAULT FALSE,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS submissions(id BIGSERIAL PRIMARY KEY,user_id BIGINT REFERENCES users(id),task_id BIGINT REFERENCES tasks(id),proof TEXT NOT NULL,status VARCHAR(20) DEFAULT 'pending',created_at TIMESTAMPTZ DEFAULT NOW(),UNIQUE(user_id,task_id));
CREATE TABLE IF NOT EXISTS ledger(id BIGSERIAL PRIMARY KEY,user_id BIGINT REFERENCES users(id),amount_ugx INTEGER NOT NULL,entry_type VARCHAR(30) NOT NULL,description VARCHAR(240) NOT NULL,reference_id BIGINT,created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS withdrawals(id BIGSERIAL PRIMARY KEY,user_id BIGINT REFERENCES users(id),amount_ugx INTEGER NOT NULL,method VARCHAR(30) NOT NULL,account_name VARCHAR(100) NOT NULL,account_reference VARCHAR(100) NOT NULL,status VARCHAR(20) DEFAULT 'pending',created_at TIMESTAMPTZ DEFAULT NOW());
`)}
