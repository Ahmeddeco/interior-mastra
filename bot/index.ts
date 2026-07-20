import { Mastra } from '@mastra/core/mastra'
import { interiorDesignerAgent } from "./agents/interior-designer-agent"
import { PostgresStore } from '@mastra/pg'


const storage = new PostgresStore({
  id: 'pg-storage',
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
})

export const mastra = new Mastra({
  agents: { interiorDesignerAgent },
  storage,
})