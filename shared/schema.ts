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

  // Astrological compatibility
  birthTime: text("birth_time"),
  birthPlace: text("birth_place"),
  rashi: text("rashi"), // Moon sign
  nakshatra: text("nakshatra"), // Birth star
  manglikStatus: text("manglik_status"), // Yes, No, Anshik
  gunaScore: integer("guna_score"), // Out of 36
  doshas: jsonb("doshas").$type<string[]>(), // Mangal, Shani, etc.

  // Lifestyle preferences
  smokingHabits: text("smoking_habits"), // No, Socially, Regularly
  drinkingHabits: text("drinking_habits"), // No, Socially, Regularly
  eatingHabits: text("eating_habits"), // Vegetarian, Vegan, Non Vegetarian, Eggetarian, Pescetarian

  // Vedic lifestyle
  dailyRoutine: text("daily_routine"), // Dinacharya type
  ayurvedicConstitution: text("ayurvedic_constitution"), // 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha'
  fastingPractices: jsonb("fasting_practices").$type<string[]>(),
  seasonalPractices: jsonb("seasonal_practices").$type<string[]>(), // Ritucharya
  wakeUpTime: text("wake_up_time"),
  sleepTime: text("sleep_time"),

  // Family and astrological attributes
  hasChildren: text("has_children"), // No, Yes - living with me, Yes - not living with me, Prefer not to say
  horoscope: text("horoscope"), // Zodiac signs
  // mangalik: text("mangalik"), // Replaced by manglikStatus
  residentialStatus: text("residential_status"), // Citizen, Permanent Resident, Work Permit, etc.

  // Physical and health attributes
  physicalStatus: text("physical_status"), // Normal, Physically Challenged
  bloodGroup: text("blood_group"), // A+, A-, B+, B-, AB+, AB-, O+, O-
  healthConditions: text("health_conditions"), // Any chronic conditions including HIV+
  medicalHistory: text("medical_history"), // Any relevant medical history

  // Personal goals and aspirations
  bio: text("bio"),

  // Dharmic goals & life purpose
  ashramsGoals: jsonb("ashrams_goals").$type<string[]>(), // Grihastha objectives
  dharmicCareerPath: text("dharmic_career_path"),
  sevaPreferences: jsonb("seva_preferences").$type<string[]>(),
  spiritualGoals: jsonb("spiritual_goals").$type<string[]>(),
  familyValues: jsonb("family_values").$type<string[]>(),
  childRearingPhilosophy: text("child_rearing_philosophy"),
  jointSpiritualPractices: jsonb("joint_spiritual_practices").$type<string[]>(),

  // Community & lineage
  discipleLineage: text("disciple_lineage"),
  satsangCommunity: jsonb("satsang_community").$type<string[]>(),
  pilgrimageExperience: jsonb("pilgrimage_experience").$type<string[]>(),
  festivalCelebrations: jsonb("festival_celebrations").$type<string[]>(),
  preferredDeities: jsonb("preferred_deities").$type<string[]>(),
  spiritualMentor: text("spiritual_mentor"),

  // Profile details
  photoUrl: text("photo_url"),
  verified: boolean("verified").default(false),
  active: boolean("active").default(true),
  profileCompletionPercentage: integer("profile_completion_percentage").default(15),

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
  casteGroup: z.string().optional(),
  casteSubcaste: z.string().optional(),
  casteGroups: z.array(z.string()).optional(),
  casteSubcastes: z.array(z.string()).optional(),
  combinedCastes: z.array(z.string()).optional(), // Backend processed combination
  religion: z.string().optional(),
  ethnicity: z.string().optional(),
  annualIncome: z.string().optional(),
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
  // mangalik: z.string().optional(), // Replaced by manglikStatus
  residentialStatus: z.string().optional(),

  // Astrological compatibility filters
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  rashi: z.string().optional(),
  nakshatra: z.string().optional(),
  manglikStatus: z.enum(['Yes', 'No', 'Anshik']).optional(),
  gunaScoreMin: z.number().optional(),
  gunaScoreMax: z.number().optional(),
  doshas: z.array(z.string()).optional(),

  // Vedic lifestyle filters
  dailyRoutine: z.string().optional(),
  ayurvedicConstitution: z.enum(['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha']).optional(),
  fastingPractices: z.array(z.string()).optional(),
  seasonalPractices: z.array(z.string()).optional(),
  wakeUpTime: z.string().optional(),
  sleepTime: z.string().optional(),

  // Dharmic goals & life purpose filters
  ashramsGoals: z.array(z.string()).optional(),
  dharmicCareerPath: z.string().optional(),
  sevaPreferences: z.array(z.string()).optional(),
  spiritualGoals: z.array(z.string()).optional(),
  familyValues: z.array(z.string()).optional(),
  childRearingPhilosophy: z.string().optional(),
  jointSpiritualPractices: z.array(z.string()).optional(),

  // Community & lineage filters
  discipleLineage: z.string().optional(),
  satsangCommunity: z.array(z.string()).optional(),
  pilgrimageExperience: z.array(z.string()).optional(),
  festivalCelebrations: z.array(z.string()).optional(),
  preferredDeities: z.array(z.string()).optional(),
  spiritualMentor: z.string().optional(),

  // Quick Filters
  verified: z.boolean().optional(),
  withPhoto: z.boolean().optional(),
  recentlyJoined: z.boolean().optional(),
  nearby: z.boolean().optional(),
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

// Alias for backward compatibility
export type UserProfile = SpiritualProfile;