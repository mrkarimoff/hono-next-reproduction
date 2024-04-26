import { relations, sql } from "drizzle-orm";
import {
  int,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export enum Role {
  Member = "member",
  Admin = "admin",
  Owner = "owner",
}

export const users = sqliteTable("users", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));

export const teams = sqliteTable("teams", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
  projects: many(projects),
}));

export const usersToTeams = sqliteTable(
  "users_to_teams",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id),
    teamId: integer("teamId")
      .notNull()
      .references(() => teams.id),
    role: text("role").notNull(),
    joinedAt: text("joinedAt")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.teamId] }),
  })
);

export const usersToTeamsRelations = relations(usersToTeams, ({ one }) => ({
  team: one(teams, {
    fields: [usersToTeams.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [usersToTeams.userId],
    references: [users.id],
  }),
}));

export const projects = sqliteTable("projects", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  teamId: integer("teamId"),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
}));
