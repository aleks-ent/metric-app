import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const guestbookTable = sqliteTable('guestbook', {
  id: integer('id').primaryKey(),
  username: text('username').notNull(),
  body: text('body').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  summary: text('summary'),
})

export const metricsTable = sqliteTable('metrics', {
  id: integer('id').primaryKey(),
  created_at: text('created_at').notNull(),
  owner: text('owner').notNull(),
  repo: text('repo').notNull(),
  metrics: text('metrics').notNull(),
  summary: text('summary'),
})
