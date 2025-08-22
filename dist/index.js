// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
function generateProfileId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
var MemStorage = class {
  users;
  spiritualProfiles;
  interests;
  quotes;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.spiritualProfiles = /* @__PURE__ */ new Map();
    this.interests = /* @__PURE__ */ new Map();
    this.quotes = /* @__PURE__ */ new Map();
    this.initializeQuotes();
    this.initializeSampleProfiles();
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  // Profile operations
  async getSpiritualProfile(id) {
    return this.spiritualProfiles.get(id);
  }
  async getProfileByUserId(userId) {
    return Array.from(this.spiritualProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }
  async createSpiritualProfile(insertProfile) {
    const id = generateProfileId();
    const profile = {
      ...insertProfile,
      id,
      spiritualPractices: insertProfile.spiritualPractices || [],
      sacredTexts: insertProfile.sacredTexts || [],
      verified: false,
      active: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.spiritualProfiles.set(id, profile);
    return profile;
  }
  async updateSpiritualProfile(id, updateData) {
    const profile = this.spiritualProfiles.get(id);
    if (!profile) return void 0;
    const updatedProfile = {
      ...profile,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.spiritualProfiles.set(id, updatedProfile);
    return updatedProfile;
  }
  async searchProfiles(filters, excludeUserId) {
    let profiles = Array.from(this.spiritualProfiles.values()).filter(
      (profile) => profile.active && profile.userId !== excludeUserId
    );
    if (filters.ageMin) {
      profiles = profiles.filter((p) => p.age >= filters.ageMin);
    }
    if (filters.ageMax) {
      profiles = profiles.filter((p) => p.age <= filters.ageMax);
    }
    if (filters.state) {
      profiles = profiles.filter((p) => p.state?.toLowerCase().includes(filters.state.toLowerCase()));
    }
    if (filters.city) {
      profiles = profiles.filter((p) => p.city?.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.motherTongue) {
      profiles = profiles.filter((p) => p.motherTongue === filters.motherTongue);
    }
    if (filters.spiritualPractices && filters.spiritualPractices.length > 0) {
      profiles = profiles.filter(
        (p) => filters.spiritualPractices.some(
          (practice) => (p.spiritualPractices || []).includes(practice)
        )
      );
    }
    if (filters.sacredTexts && filters.sacredTexts.length > 0) {
      profiles = profiles.filter(
        (p) => filters.sacredTexts.some(
          (text2) => (p.sacredTexts || []).includes(text2)
        )
      );
    }
    if (filters.guruLineage) {
      profiles = profiles.filter(
        (p) => p.guruLineage?.toLowerCase().includes(filters.guruLineage.toLowerCase())
      );
    }
    if (filters.education) {
      profiles = profiles.filter((p) => p.education === filters.education);
    }
    if (filters.profession) {
      profiles = profiles.filter((p) => p.profession === filters.profession);
    }
    if (filters.maritalStatus) {
      profiles = profiles.filter((p) => p.maritalStatus === filters.maritalStatus);
    }
    if (filters.caste) {
      profiles = profiles.filter((p) => p.caste === filters.caste);
    }
    if (filters.heightMin) {
      profiles = profiles.filter((p) => p.height && p.height >= filters.heightMin);
    }
    if (filters.heightMax) {
      profiles = profiles.filter((p) => p.height && p.height <= filters.heightMax);
    }
    if (filters.smokingHabits) {
      profiles = profiles.filter((p) => p.smokingHabits === filters.smokingHabits);
    }
    if (filters.drinkingHabits) {
      profiles = profiles.filter((p) => p.drinkingHabits === filters.drinkingHabits);
    }
    if (filters.eatingHabits) {
      profiles = profiles.filter((p) => p.eatingHabits === filters.eatingHabits);
    }
    if (filters.physicalStatus) {
      profiles = profiles.filter((p) => p.physicalStatus === filters.physicalStatus);
    }
    if (filters.bloodGroup) {
      profiles = profiles.filter((p) => p.bloodGroup === filters.bloodGroup);
    }
    if (filters.healthConditions) {
      profiles = profiles.filter((p) => p.healthConditions === filters.healthConditions);
    }
    if (filters.hasChildren) {
      profiles = profiles.filter((p) => p.hasChildren === filters.hasChildren);
    }
    if (filters.horoscope) {
      profiles = profiles.filter((p) => p.horoscope === filters.horoscope);
    }
    if (filters.mangalik) {
      profiles = profiles.filter((p) => p.mangalik === filters.mangalik);
    }
    if (filters.residentialStatus) {
      profiles = profiles.filter((p) => p.residentialStatus === filters.residentialStatus);
    }
    if (filters.combinedCastes?.length) {
      const casteConditions = filters.combinedCastes.map((caste) => ilike(spiritualProfiles.caste, `%${caste}%`));
      conditions.push(or(...casteConditions));
    } else {
      if (filters.casteGroups?.length) {
        const casteGroupConditions = filters.casteGroups.filter((group) => group !== "All").map((group) => ilike(spiritualProfiles.caste, `%${group}%`));
        if (casteGroupConditions.length > 0) {
          conditions.push(or(...casteGroupConditions));
        }
      }
      if (filters.casteSubcastes?.length) {
        const casteSubcasteConditions = filters.casteSubcastes.map((subcaste) => ilike(spiritualProfiles.caste, `%${subcaste}%`));
        conditions.push(or(...casteSubcasteConditions));
      }
    }
    return profiles;
  }
  async getFeaturedProfiles(limit = 6) {
    const profiles = Array.from(this.spiritualProfiles.values()).filter((profile) => profile.active && profile.verified).sort(() => Math.random() - 0.5);
    return profiles.slice(0, limit);
  }
  // Interest operations
  async createInterest(insertInterest) {
    const id = randomUUID();
    const interest = {
      ...insertInterest,
      id,
      status: "sent",
      message: insertInterest.message || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.interests.set(id, interest);
    return interest;
  }
  async getInterest(fromProfileId, toProfileId) {
    return Array.from(this.interests.values()).find(
      (interest) => interest.fromProfileId === fromProfileId && interest.toProfileId === toProfileId
    );
  }
  async getInterestsByProfile(profileId) {
    return Array.from(this.interests.values()).filter(
      (interest) => interest.fromProfileId === profileId || interest.toProfileId === profileId
    );
  }
  async updateInterestStatus(id, status) {
    const interest = this.interests.get(id);
    if (!interest) return void 0;
    const updatedInterest = { ...interest, status };
    this.interests.set(id, updatedInterest);
    return updatedInterest;
  }
  // Quote operations
  async getRandomQuote() {
    const quotes = Array.from(this.quotes.values()).filter((q) => q.isActive);
    if (quotes.length === 0) return void 0;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  async getAllQuotes() {
    return Array.from(this.quotes.values()).filter((q) => q.isActive);
  }
  async createQuote(insertQuote) {
    const id = randomUUID();
    const quote = {
      ...insertQuote,
      id,
      translation: insertQuote.translation || null,
      chapter: insertQuote.chapter || null,
      verse: insertQuote.verse || null,
      isActive: true
    };
    this.quotes.set(id, quote);
    return quote;
  }
  initializeQuotes() {
    const quotes = [
      {
        quoteText: "\u092F\u0924\u094D\u0930 \u0928\u093E\u0930\u094D\u092F\u0938\u094D\u0924\u0941 \u092A\u0942\u091C\u094D\u092F\u0928\u094D\u0924\u0947 \u0930\u092E\u0928\u094D\u0924\u0947 \u0924\u0924\u094D\u0930 \u0926\u0947\u0935\u0924\u093E\u0903",
        translation: "Where women are honored, there the gods are pleased",
        source: "Manusmriti",
        chapter: "3",
        verse: "56"
      },
      {
        quoteText: "\u0927\u0930\u094D\u092E\u0947 \u091A \u0905\u0930\u094D\u0925\u0947 \u091A \u0915\u093E\u092E\u0947 \u091A \u092E\u094B\u0915\u094D\u0937\u0947 \u091A \u092D\u0930\u0924\u0930\u094D\u0937\u092D",
        translation: "In dharma, artha, kama and moksha, O best of Bharatas",
        source: "Mahabharata",
        chapter: "Vana Parva",
        verse: "33.6"
      },
      {
        quoteText: "\u0938\u0930\u094D\u0935\u0947 \u092D\u0935\u0928\u094D\u0924\u0941 \u0938\u0941\u0916\u093F\u0928\u0903 \u0938\u0930\u094D\u0935\u0947 \u0938\u0928\u094D\u0924\u0941 \u0928\u093F\u0930\u093E\u092E\u092F\u093E\u0903",
        translation: "May all beings be happy, may all beings be free from disease",
        source: "Upanishads",
        chapter: "Peace Mantra",
        verse: ""
      }
    ];
    quotes.forEach((quote) => {
      const id = randomUUID();
      this.quotes.set(id, { ...quote, id, isActive: true });
    });
  }
  initializeSampleProfiles() {
    const sampleProfiles = [
      {
        userId: randomUUID(),
        name: "Arjun Sharma",
        age: 28,
        height: `5'8"`,
        motherTongue: "Hindi",
        state: "Delhi",
        city: "New Delhi",
        education: "MBA",
        profession: "Software Engineer",
        maritalStatus: "Never Married",
        caste: "Brahmin",
        spiritualPractices: ["Meditation & Dhyana", "Daily Sadhana", "Yoga Practice"],
        sacredTexts: ["Bhagavad Gita", "Upanishads"],
        guruLineage: "Goenka Tradition",
        dailySadhana: "Morning meditation and pranayama",
        sevaActivities: "Teaching meditation to children",
        dietaryLifestyle: "Sattvic Vegetarian",
        dharmaGoals: "Self-realization through dharmic living",
        mokshaPerspective: "Liberation through selfless service",
        grhasthaVision: "Spiritual partnership in family life",
        bio: "Practicing Vipassana meditation for 5 years. Seeking a partner for conscious living in Grihastha Ashram.",
        photoUrl: null,
        verified: true,
        smokingHabits: "No",
        drinkingHabits: "No",
        eatingHabits: "Vegetarian",
        physicalStatus: "Normal",
        bloodGroup: "O+",
        hasChildren: "No",
        horoscope: "Leo",
        mangalik: "No",
        residentialStatus: "Citizen",
        healthConditions: "None",
        medicalHistory: null
      },
      {
        userId: randomUUID(),
        name: "Sita Devi",
        age: 25,
        height: `5'4"`,
        motherTongue: "Bengali",
        state: "West Bengal",
        city: "Kolkata",
        education: "MA Literature",
        profession: "Teacher",
        maritalStatus: "Never Married",
        caste: "Kayastha",
        spiritualPractices: ["Meditation & Dhyana", "Seva & Karma Yoga"],
        sacredTexts: ["Ramayana", "Bhagavad Gita"],
        guruLineage: "Ramakrishna Mission",
        dailySadhana: "Evening prayers and chanting",
        sevaActivities: "Teaching underprivileged children",
        dietaryLifestyle: "Lacto Vegetarian",
        dharmaGoals: "Service to humanity as spiritual practice",
        mokshaPerspective: "Divine realization through devotion",
        grhasthaVision: "Creating a dharmic household",
        bio: "Teaching underprivileged children. Looking for a spiritually aligned partner for dharmic life.",
        photoUrl: null,
        verified: true,
        smokingHabits: "No",
        drinkingHabits: "Socially",
        eatingHabits: "Vegetarian",
        physicalStatus: "Normal",
        bloodGroup: "A+",
        healthConditions: "None",
        medicalHistory: null
      }
    ];
    sampleProfiles.forEach((profile) => {
      const id = generateProfileId();
      this.spiritualProfiles.set(id, {
        ...profile,
        id,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        active: true
      });
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  profileFor: text("profile_for").notNull(),
  // Self, Son, Daughter, etc.
  gender: text("gender").notNull(),
  // Bride, Groom
  createdAt: timestamp("created_at").defaultNow()
});
var spiritualProfiles2 = pgTable("spiritual_profiles", {
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
  spiritualPractices: jsonb("spiritual_practices").$type().notNull().default([]),
  sacredTexts: jsonb("sacred_texts").$type().notNull().default([]),
  guruLineage: text("guru_lineage"),
  // Astrological compatibility
  birthTime: text("birth_time"),
  birthPlace: text("birth_place"),
  rashi: text("rashi"),
  // Moon sign
  nakshatra: text("nakshatra"),
  // Birth star
  manglikStatus: text("manglik_status"),
  // Yes, No, Anshik
  gunaScore: integer("guna_score"),
  // Out of 36
  doshas: jsonb("doshas").$type(),
  // Mangal, Shani, etc.
  // Lifestyle preferences
  smokingHabits: text("smoking_habits"),
  // No, Socially, Regularly
  drinkingHabits: text("drinking_habits"),
  // No, Socially, Regularly
  eatingHabits: text("eating_habits"),
  // Vegetarian, Vegan, Non Vegetarian, Eggetarian, Pescetarian
  // Vedic lifestyle
  dailyRoutine: text("daily_routine"),
  // Dinacharya type
  ayurvedicConstitution: text("ayurvedic_constitution"),
  // 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha'
  fastingPractices: jsonb("fasting_practices").$type(),
  seasonalPractices: jsonb("seasonal_practices").$type(),
  // Ritucharya
  wakeUpTime: text("wake_up_time"),
  sleepTime: text("sleep_time"),
  // Family and astrological attributes
  hasChildren: text("has_children"),
  // No, Yes - living with me, Yes - not living with me, Prefer not to say
  horoscope: text("horoscope"),
  // Zodiac signs
  // mangalik: text("mangalik"), // Replaced by manglikStatus
  residentialStatus: text("residential_status"),
  // Citizen, Permanent Resident, Work Permit, etc.
  // Physical and health attributes
  physicalStatus: text("physical_status"),
  // Normal, Physically Challenged
  bloodGroup: text("blood_group"),
  // A+, A-, B+, B-, AB+, AB-, O+, O-
  healthConditions: text("health_conditions"),
  // Any chronic conditions including HIV+
  medicalHistory: text("medical_history"),
  // Any relevant medical history
  // Personal goals and aspirations
  bio: text("bio"),
  // Dharmic goals & life purpose
  ashramsGoals: jsonb("ashrams_goals").$type(),
  // Grihastha objectives
  dharmicCareerPath: text("dharmic_career_path"),
  sevaPreferences: jsonb("seva_preferences").$type(),
  spiritualGoals: jsonb("spiritual_goals").$type(),
  familyValues: jsonb("family_values").$type(),
  childRearingPhilosophy: text("child_rearing_philosophy"),
  jointSpiritualPractices: jsonb("joint_spiritual_practices").$type(),
  // Community & lineage
  discipleLineage: text("disciple_lineage"),
  satsangCommunity: jsonb("satsang_community").$type(),
  pilgrimageExperience: jsonb("pilgrimage_experience").$type(),
  festivalCelebrations: jsonb("festival_celebrations").$type(),
  preferredDeities: jsonb("preferred_deities").$type(),
  spiritualMentor: text("spiritual_mentor"),
  // Profile details
  photoUrl: text("photo_url"),
  verified: boolean("verified").default(false),
  active: boolean("active").default(true),
  profileCompletionPercentage: integer("profile_completion_percentage").default(15),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var interests = pgTable("interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromProfileId: varchar("from_profile_id").references(() => spiritualProfiles2.id).notNull(),
  toProfileId: varchar("to_profile_id").references(() => spiritualProfiles2.id).notNull(),
  status: text("status").default("sent"),
  // sent, accepted, declined
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow()
});
var inspirationalQuotes = pgTable("inspirational_quotes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quoteText: text("quote_text").notNull(),
  translation: text("translation"),
  source: text("source").notNull(),
  // Gita, Upanishads, etc.
  chapter: text("chapter"),
  verse: text("verse"),
  isActive: boolean("is_active").default(true)
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertSpiritualProfileSchema = createInsertSchema(spiritualProfiles2).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertInterestSchema = createInsertSchema(interests).omit({
  id: true,
  createdAt: true
});
var insertInspirationalQuoteSchema = createInsertSchema(inspirationalQuotes).omit({
  id: true
});
var profileFilterSchema = z.object({
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
  combinedCastes: z.array(z.string()).optional(),
  // Backend processed combination
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
  // Basic Preferences
  ageRangeMin: z.number().optional(),
  ageRangeMax: z.number().optional(),
  heightRange: z.string().optional(),
  heightRangeMin: z.string().optional(),
  heightRangeMax: z.string().optional(),
  locationPreference: z.string().optional(),
  // Astrological compatibility filters
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  rashi: z.string().optional(),
  nakshatra: z.string().optional(),
  manglikStatus: z.enum(["Yes", "No", "Anshik"]).optional(),
  gunaScoreMin: z.number().optional(),
  gunaScoreMax: z.number().optional(),
  doshas: z.array(z.string()).optional(),
  // Vedic lifestyle filters
  dailyRoutine: z.string().optional(),
  ayurvedicConstitution: z.enum(["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha"]).optional(),
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
  // About Me section
  selfDescription: z.string().optional(),
  spiritualJourney: z.string().optional(),
  dailyRoutine: z.string().optional(),
  profileImage: z.string().optional(),
  // Family Details section
  familyBackground: z.string().optional(),
  familyOccupation: z.string().optional(),
  familyLifestyle: z.string().optional(),
  // Partner Preferences section
  idealPartner: z.string().optional(),
  spiritualAlignment: z.string().optional(),
  spiritualAlignmentDetails: z.string().optional(),
  relocationPreference: z.string().optional(),
  careerChoice: z.string().optional(),
  careerChoiceDetails: z.string().optional(),
  horoscopePreference: z.string().optional(),
  horoscopePreferenceDetails: z.string().optional(),
  parentingVision: z.string().optional(),
  supportExpectations: z.string().optional(),
  // Additional Spiritual Details section
  spiritualPath: z.string().optional(),
  gurusInspirations: z.string().optional(),
  coreValues: z.string().optional(),
  spiritualInterests: z.string().optional()
});

// client/src/data/locations.ts
var countries = [
  { value: "IN", label: "India" },
  { value: "US", label: "USA" },
  { value: "GB", label: "UK" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "UAE" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "NL", label: "Netherlands" },
  { value: "CH", label: "Switzerland" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "NZ", label: "New Zealand" },
  { value: "JP", label: "Japan" },
  { value: "MY", label: "Malaysia" },
  { value: "TH", label: "Thailand" },
  { value: "OTHER", label: "Other" }
];
var statesByCountry = {
  IN: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ],
  US: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ],
  CA: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon"
  ],
  GB: [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland"
  ],
  AU: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia"
  ]
};
var citiesByState = {
  // Indian States and Cities
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Kakinada", "Anantapur", "Tirupati", "Chittoor", "Eluru", "Ongole", "Machilipatnam", "Adoni", "Vizianagaram", "Srikakulam", "Hindupur", "Proddatur", "Madanapalle"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Bomdila", "Ziro", "Along", "Changlang", "Tezu", "Khonsa"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Barpeta", "Dhubri", "North Lakhimpur", "Karimganj", "Sivasagar", "Goalpara", "Bongaigaon", "Lanka"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Saharsa", "Hajipur", "Sasaram", "Dehri", "Siwan", "Motihari", "Nawada"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund", "Dhamtari", "Chirmiri", "Janjgir", "Sakti", "Tilda Newra"],
  "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Quepem"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi", "Nadiad", "Surendranagar", "Bharuch", "Mehsana", "Bhuj", "Porbandar", "Palanpur", "Valsad", "Vapi", "Godhra", "Veraval", "Mahesana", "Botad", "Amreli"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Narnaul", "Pundri", "Kosli"],
  "Himachal Pradesh": ["Shimla", "Solan", "Dharamshala", "Mandi", "Palampur", "Baddi", "Nahan", "Una", "Kullu", "Hamirpur", "Bilaspur", "Chamba", "Kangra", "Kasauli", "Dalhousie"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Chaibasa", "Gumla", "Dumka", "Sahibganj"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Shimoga", "Tumkur", "Raichur", "Bijapur", "Bellary", "Udupi", "Hospet", "Gadag", "Mandya", "Hassan", "Bidar", "Chitradurga", "Kolar", "Dharwad", "Bagalkot", "Karwar", "Bhadravati", "Ranebennuru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Malappuram", "Kottayam", "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad", "Ernakulam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Dewas", "Satna", "Ratlam", "Rewa", "Sagar", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Malegaon", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambajogai", "Nanded", "Satara", "Wardha", "Yavatmal", "Osmanabad", "Nandurbar", "Gondia", "Beed"],
  "Manipur": ["Imphal", "Thoubal", "Lilong", "Mayang Imphal", "Kakching", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul", "Tamenglong"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Nongpoh", "Mairang", "Resubelpara", "Ampati"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit", "Bairabi", "Vairengte"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng", "Peren", "Mon"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Barbil", "Khordha", "Bolangir", "Rayagada"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Hoshiarpur", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Kapurthala", "Faridkot"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Kishangarh", "Beawar", "Dhaulpur", "Tonk", "Churu", "Barmer", "Jhunjhunu", "Nagaur"],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Mangan", "Rangpo", "Jorethang", "Nayabazar", "Singtam", "Tadong", "Rhenock"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Kumbakonam"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Miryalaguda", "Suryapet", "Jagtial", "Mancherial", "Nirmal", "Kothagudem"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia", "Khowai", "Teliamura", "Sabroom", "Kumarghat", "Sonamura"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad", "Mau", "Ghaziabad", "Faizabad", "Mirzapur", "Bulandshahr", "Etawah", "Mainpuri", "Budaun", "Unnao", "Sitapur", "Lakhimpur", "Gonda", "Azamgarh", "Ballia", "Deoria", "Kushinagar", "Maharajganj", "Sant Kabir Nagar", "Siddharthnagar", "Basti", "Ambedkar Nagar"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Kotdwar", "Ramnagar", "Manglaur", "Laksar", "Tanakpur", "Pithoragarh", "Champawat", "Kichha"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat"],
  // Union Territories
  "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Car Nicobar", "Nancowry", "Campbell Bay"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Dadra", "Nagar Haveli"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi", "Shahdara"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Baramulla", "Anantnag", "Sopore", "KathuA", "Udhampur", "Punch", "Rajouri", "Kupwara"],
  "Ladakh": ["Leh", "Kargil", "Nubra", "Changthang", "Zanskar", "Drass"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott", "Kalpeni", "Kadmat", "Kiltan", "Chetlat", "Bitra"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  // US States and Cities
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Santa Ana", "Riverside", "Stockton", "Irvine", "Chula Vista"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica", "White Plains", "Troy", "Niagara Falls", "Binghamton", "Freeport"],
  "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo", "Lubbock", "Garland", "Irving", "Amarillo", "Grand Prairie"],
  "Florida": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral", "Pembroke Pines", "Hollywood", "Gainesville", "Miramar", "Coral Springs"],
  // UK Cities
  "England": ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol", "Newcastle", "Nottingham", "Leicester", "Coventry", "Bradford", "Stoke-on-Trent", "Wolverhampton", "Plymouth"],
  "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Stirling", "Perth", "Inverness", "Paisley", "East Kilbride", "Livingston", "Hamilton", "Cumbernauld", "Kirkcaldy", "Dunfermline", "Ayr"],
  "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Caerphilly", "Rhondda", "Bridgend", "Neath", "Port Talbot", "Cwmbran", "Llanelli", "Cardiff", "Bangor", "Merthyr Tydfil"],
  "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newtownabbey", "Bangor", "Craigavon", "Castlereagh", "Ballymena", "Newtownards", "Carrickfergus", "Coleraine", "Omagh", "Larne", "Strabane", "Limavady"],
  // Canada Cities
  "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor", "Richmond Hill", "Oakville", "Burlington", "Oshawa", "Barrie"],
  "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Saanich", "Delta", "Kamloops", "Langley", "Victoria", "Nanaimo", "Chilliwack", "Prince George"],
  "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Trois-Rivi\xE8res", "Terrebonne", "Saint-Jean-sur-Richelieu", "Repentigny", "Brossard", "Drummondville", "Saint-J\xE9r\xF4me", "Granby"],
  "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Okotoks", "Camrose", "Lloydminster", "Fort Saskatchewan", "Leduc", "Beaumont"],
  // Australia Cities
  "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Maitland", "Wagga Wagga", "Albury", "Port Macquarie", "Tamworth", "Orange", "Dubbo", "Queanbeyan", "Bathurst", "Nowra", "Warrnambool", "Lismore"],
  "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Melton", "Latrobe", "Frankston", "Casey", "Whittlesea", "Greater Dandenong", "Monash", "Knox", "Boroondara", "Manningham", "Whitehorse"],
  "Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Rockhampton", "Mackay", "Bundaberg", "Hervey Bay", "Gladstone", "Sunshine Coast", "Redland", "Logan", "Ipswich", "Moreton Bay"]
};

// server/routes.ts
import crypto from "crypto";
async function registerRoutes(app2) {
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      const user = await storage.createUser(userData);
      res.json({ user: { id: user.id, email: user.email, profileFor: user.profileFor, gender: user.gender } });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid user data" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: { id: user.id, email: user.email, profileFor: user.profileFor, gender: user.gender } });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  app2.post("/api/profiles", async (req, res) => {
    try {
      const profileData = insertSpiritualProfileSchema.parse(req.body);
      const existingProfile = await storage.getProfileByUserId(profileData.userId);
      if (existingProfile) {
        return res.status(400).json({ error: "Profile already exists for this user" });
      }
      const profile = await storage.createSpiritualProfile(profileData);
      res.json({ profile });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid profile data" });
    }
  });
  app2.get("/api/profiles/:id", async (req, res) => {
    try {
      const profile = await storage.getSpiritualProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });
  app2.get("/api/profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getProfileByUserId(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found for this user" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });
  app2.put("/api/profiles/:id", async (req, res) => {
    try {
      const updateData = req.body;
      const profile = await storage.updateSpiritualProfile(req.params.id, updateData);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update profile" });
    }
  });
  app2.post("/api/profiles/search", async (req, res) => {
    try {
      const filters = profileFilterSchema.parse(req.body.filters || {});
      const excludeUserId = req.body.excludeUserId;
      if (filters.casteGroups?.length && filters.casteSubcastes?.length) {
        const combinedCastes = [];
        const hasAllGroups = filters.casteGroups.includes("All");
        const hasAllSubcastes = filters.casteSubcastes.includes("All");
        if (hasAllGroups && hasAllSubcastes) {
          filters.combinedCastes = [];
        } else if (hasAllGroups) {
          filters.casteSubcastes.filter((s) => s !== "All").forEach((subcaste) => {
            combinedCastes.push(subcaste);
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        } else if (hasAllSubcastes) {
          filters.casteGroups.filter((g) => g !== "All").forEach((group) => {
            combinedCastes.push(group);
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        } else {
          filters.casteGroups.forEach((group) => {
            if (group !== "All") {
              filters.casteSubcastes?.forEach((subcaste) => {
                if (subcaste !== "All") {
                  combinedCastes.push(`${group} - ${subcaste}`);
                  combinedCastes.push(subcaste);
                }
              });
            }
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        }
      } else if (filters.casteGroups?.length) {
        const hasAllGroups = filters.casteGroups.includes("All");
        if (hasAllGroups) {
          filters.combinedCastes = [];
        } else {
          filters.combinedCastes = filters.casteGroups.filter((group) => group !== "All");
        }
      } else if (filters.casteSubcastes?.length) {
        const hasAllSubcastes = filters.casteSubcastes.includes("All");
        if (hasAllSubcastes) {
          filters.combinedCastes = [];
        } else {
          filters.combinedCastes = filters.casteSubcastes.filter((subcaste) => subcaste !== "All");
        }
      }
      const profiles = await storage.searchProfiles(filters, excludeUserId);
      res.json({ profiles });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid search filters" });
    }
  });
  app2.get("/api/profiles/featured/:limit?", async (req, res) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : 6;
      const profiles = await storage.getFeaturedProfiles(limit);
      res.json({ profiles });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured profiles" });
    }
  });
  app2.post("/api/interests", async (req, res) => {
    try {
      const interestData = insertInterestSchema.parse(req.body);
      const existingInterest = await storage.getInterest(
        interestData.fromProfileId,
        interestData.toProfileId
      );
      if (existingInterest) {
        return res.status(400).json({ error: "Interest already sent to this profile" });
      }
      const interest = await storage.createInterest(interestData);
      res.json({ interest });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid interest data" });
    }
  });
  app2.get("/api/interests/profile/:profileId", async (req, res) => {
    try {
      const interests2 = await storage.getInterestsByProfile(req.params.profileId);
      res.json({ interests: interests2 });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interests" });
    }
  });
  app2.put("/api/interests/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !["accepted", "declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid status. Must be 'accepted' or 'declined'" });
      }
      const interest = await storage.updateInterestStatus(req.params.id, status);
      if (!interest) {
        return res.status(404).json({ error: "Interest not found" });
      }
      res.json({ interest });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update interest status" });
    }
  });
  app2.get("/api/quotes/random", async (req, res) => {
    try {
      const quote = await storage.getRandomQuote();
      if (!quote) {
        return res.status(404).json({ error: "No quotes available" });
      }
      res.json({ quote });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quote" });
    }
  });
  app2.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json({ quotes });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });
  app2.get("/api/spiritual-practices", (req, res) => {
    const practices = [
      "Meditation & Dhyana",
      "Daily Sadhana",
      "Seva & Karma Yoga",
      "Yoga Practice",
      "Pranayama",
      "Japa Meditation",
      "Vipassana",
      "Mindfulness",
      "Bhakti Yoga",
      "Raja Yoga"
    ];
    res.json({ practices });
  });
  app2.get("/api/sacred-texts", (req, res) => {
    const texts = [
      "Bhagavad Gita",
      "Upanishads",
      "Ramayana",
      "Mahabharata",
      "Vedas",
      "Puranas",
      "Yoga Sutras",
      "Brahma Sutras",
      "Bhagavata Purana",
      "Shrimad Bhagavatam"
    ];
    res.json({ texts });
  });
  app2.get("/api/countries", (req, res) => {
    res.json({ countries });
  });
  app2.get("/api/states", (req, res) => {
    const { country } = req.query;
    const states = statesByCountry[country] || [];
    res.json({ states });
  });
  app2.get("/api/cities", (req, res) => {
    const { state } = req.query;
    const cities = citiesByState[state] || [];
    res.json({ cities });
  });
  app2.get("/api/languages", (req, res) => {
    const languages = [
      "Hindi",
      "Bengali",
      "Tamil",
      "Telugu",
      "Gujarati",
      "Marathi",
      "Punjabi",
      "Malayalam",
      "Kannada",
      "English",
      "Urdu",
      "Odia",
      "Assamese",
      "Other"
    ];
    res.json({ languages });
  });
  app2.post("/api/auth/login", (req, res) => {
    const { email, mobile, password, otp, stayLoggedIn } = req.body;
    if (password === "demo123" || otp === "123456") {
      const user = {
        id: crypto.randomBytes(16).toString("hex"),
        firstName: "Demo",
        lastName: "User",
        email: email || "demo@example.com",
        mobile: mobile || "9876543210",
        isVerified: true
      };
      const token = crypto.randomBytes(32).toString("hex");
      res.json({
        success: true,
        user,
        token,
        message: "Login successful"
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  });
  app2.post("/api/auth/signup", (req, res) => {
    const userData = req.body;
    const user = {
      id: crypto.randomBytes(16).toString("hex"),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      isVerified: false
    };
    const token = crypto.randomBytes(32).toString("hex");
    res.json({
      success: true,
      user,
      token,
      message: "Account created successfully"
    });
  });
  app2.post("/api/auth/send-otp", (req, res) => {
    const { contactMethod } = req.body;
    console.log(`Sending OTP to: ${contactMethod}`);
    res.json({
      success: true,
      message: "OTP sent successfully"
    });
  });
  app2.post("/api/auth/verify-otp", (req, res) => {
    const { contactMethod, otp } = req.body;
    if (otp === "123456") {
      const user = {
        id: "1",
        firstName: "OTP",
        lastName: "User",
        email: contactMethod.includes("@") ? contactMethod : "otp@example.com",
        mobile: contactMethod.includes("@") ? "9876543210" : contactMethod,
        isVerified: true
      };
      const token = crypto.randomBytes(32).toString("hex");
      res.json({
        success: true,
        user,
        token,
        message: "OTP verified successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }
  });
  app2.post("/api/auth/reset-password", (req, res) => {
    const { contactMethod, otp, newPassword } = req.body;
    if (otp === "123456" && newPassword.length >= 8) {
      res.json({
        success: true,
        message: "Password reset successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP or password requirements not met"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __dirname2 = path2.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: {
      port: 5001,
      host: "0.0.0.0"
    },
    watch: {
      usePolling: true,
      interval: 1e3
    },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  log("\u{1F680} Starting server initialization...");
  const server = await registerRoutes(app);
  log("\u{1F4CB} Routes registered successfully");
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = Number(process.env.PORT) || 5e3;
  const host = process.env.HOST || "0.0.0.0";
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      log(`Port ${port} is already in use. Server will exit.`);
      process.exit(1);
    } else {
      log(`Server error: ${err.message}`);
      throw err;
    }
  });
  process.on("SIGINT", () => {
    log("Received SIGINT. Graceful shutdown...");
    server.close(() => {
      log("Server closed");
      process.exit(0);
    });
  });
  process.on("SIGTERM", () => {
    log("Received SIGTERM. Graceful shutdown...");
    server.close(() => {
      log("Server closed");
      process.exit(0);
    });
  });
  try {
    log(`\u{1F527} Attempting to start server on ${host}:${port}...`);
    server.listen(port, host, () => {
      log(`\u2705 Server running at http://${host}:${port}`);
      log(`\u{1F680} Environment: ${app.get("env") || "development"}`);
      log(`\u{1F310} Server is ready to accept connections`);
    });
  } catch (error) {
    log(`\u274C Failed to start server: ${error}`);
    process.exit(1);
  }
})();
