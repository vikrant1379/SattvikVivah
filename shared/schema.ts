import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  profileFor: text("profile_for").notNull(), // Self, Son, Daughter, etc.
  gender: text("gender").notNull(), // Bride, Groom
  createdAt: timestamp("created_at").defaultNow(),
});

export const spiritualProfiles = pgTable("spiritual_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  height: text("height"),
  motherTongue: text("mother_tongue"),
  state: text("state"),
  city: text("city"),
  education: text("education"),
  profession: text("profession"),
  maritalStatus: text("marital_status").default("Never Married"),
  caste: text("caste"),
  religion: text("religion"),
  ethnicity: text("ethnicity"),
  annualIncome: text("annual_income"),

  // Spiritual attributes
  spiritualPractices: jsonb("spiritual_practices").$type<string[]>().notNull().default([]),
  sacredTexts: jsonb("sacred_texts").$type<string[]>().notNull().default([]),
  guruLineage: text("guru_lineage"),
  dailySadhana: text("daily_sadhana"),
  sevaActivities: text("seva_activities"),
  // Lifestyle attributes
  smokingHabits: text("smoking_habits"), // No, Socially, Regularly
  drinkingHabits: text("drinking_habits"), // No, Socially, Regularly
  eatingHabits: text("eating_habits"), // Vegetarian, Vegan, Non Vegetarian, Eggetarian, Pescetarian
  
  // Family and astrological attributes
  hasChildren: text("has_children"), // No, Yes - living with me, Yes - not living with me, Prefer not to say
  horoscope: text("horoscope"), // Zodiac signs
  mangalik: text("mangalik"), // Yes, No, Anshik, Don't know, Prefer not to say
  residentialStatus: text("residential_status"), // Citizen, Permanent Resident, Work Permit, etc.

  // Physical and health attributes
  physicalStatus: text("physical_status"), // Normal, Physically Challenged
  bloodGroup: text("blood_group"), // A+, A-, B+, B-, AB+, AB-, O+, O-
  healthConditions: text("health_conditions"), // Any chronic conditions including HIV+
  medicalHistory: text("medical_history"), // Any relevant medical history

  // Life goals and spiritual aspirations
  dharmaGoals: text("dharma_goals"),
  mokshaPerspective: text("moksha_perspective"),
  grhasthaVision: text("grhastha_vision"),

  // Profile details
  bio: text("bio"),
  photoUrl: text("photo_url"),
  verified: boolean("verified").default(false),
  active: boolean("active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const interests = pgTable("interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromProfileId: varchar("from_profile_id").references(() => spiritualProfiles.id).notNull(),
  toProfileId: varchar("to_profile_id").references(() => spiritualProfiles.id).notNull(),
  status: text("status").default("sent"), // sent, accepted, declined
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inspirationalQuotes = pgTable("inspirational_quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quoteText: text("quote_text").notNull(),
  translation: text("translation"),
  source: text("source").notNull(), // Gita, Upanishads, etc.
  chapter: text("chapter"),
  verse: text("verse"),
  isActive: boolean("is_active").default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertSpiritualProfileSchema = createInsertSchema(spiritualProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInterestSchema = createInsertSchema(interests).omit({
  id: true,
  createdAt: true,
});

export const insertInspirationalQuoteSchema = createInsertSchema(inspirationalQuotes).omit({
  id: true,
});

// Filter schema for search
export const profileFilterSchema = z.object({
  ageMin: z.number().optional(),
  ageMax: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  motherTongue: z.string().optional(),
  spiritualPractices: z.array(z.string()).optional(),
  sacredTexts: z.array(z.string()).optional(),
  guruLineage: z.string().optional(),
  education: z.string().optional(),
  profession: z.string().optional(),
  heightMin: z.string().optional(),
  heightMax: z.string().optional(),
  maritalStatus: z.string().optional(),
  caste: z.string().optional(),
  religion: z.string().optional(),
  ethnicity: z.string().optional(),
  annualIncomeMin: z.string().optional(),
  annualIncomeMax: z.string().optional(),
  smokingHabits: z.string().optional(),
  drinkingHabits: z.string().optional(),
  eatingHabits: z.string().optional(),
  physicalStatus: z.string().optional(),
  bloodGroup: z.string().optional(),
  healthConditions: z.string().optional(),
  hasChildren: z.string().optional(),
  horoscope: z.string().optional(),
  mangalik: z.string().optional(),
  residentialStatus: z.string().optional(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type SpiritualProfile = typeof spiritualProfiles.$inferSelect;
export type InsertSpiritualProfile = z.infer<typeof insertSpiritualProfileSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

export type InspirationalQuote = typeof inspirationalQuotes.$inferSelect;
export type InsertInspirationalQuote = z.infer<typeof insertInspirationalQuoteSchema>;

export type ProfileFilter = z.infer<typeof profileFilterSchema>;