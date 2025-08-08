import { 
  type User, 
  type InsertUser, 
  type SpiritualProfile, 
  type InsertSpiritualProfile,
  type Interest,
  type InsertInterest,
  type InspirationalQuote,
  type InsertInspirationalQuote,
  type ProfileFilter
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile operations  
  getSpiritualProfile(id: string): Promise<SpiritualProfile | undefined>;
  getProfileByUserId(userId: string): Promise<SpiritualProfile | undefined>;
  createSpiritualProfile(profile: InsertSpiritualProfile): Promise<SpiritualProfile>;
  updateSpiritualProfile(id: string, profile: Partial<SpiritualProfile>): Promise<SpiritualProfile | undefined>;
  searchProfiles(filters: ProfileFilter, excludeUserId?: string): Promise<SpiritualProfile[]>;
  getFeaturedProfiles(limit?: number): Promise<SpiritualProfile[]>;

  // Interest operations
  createInterest(interest: InsertInterest): Promise<Interest>;
  getInterest(fromProfileId: string, toProfileId: string): Promise<Interest | undefined>;
  getInterestsByProfile(profileId: string): Promise<Interest[]>;
  updateInterestStatus(id: string, status: string): Promise<Interest | undefined>;

  // Inspirational quotes
  getRandomQuote(): Promise<InspirationalQuote | undefined>;
  getAllQuotes(): Promise<InspirationalQuote[]>;
  createQuote(quote: InsertInspirationalQuote): Promise<InspirationalQuote>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private spiritualProfiles: Map<string, SpiritualProfile>;
  private interests: Map<string, Interest>;
  private quotes: Map<string, InspirationalQuote>;

  constructor() {
    this.users = new Map();
    this.spiritualProfiles = new Map();
    this.interests = new Map();
    this.quotes = new Map();
    
    // Initialize with sample inspirational quotes
    this.initializeQuotes();
    this.initializeSampleProfiles();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Profile operations
  async getSpiritualProfile(id: string): Promise<SpiritualProfile | undefined> {
    return this.spiritualProfiles.get(id);
  }

  async getProfileByUserId(userId: string): Promise<SpiritualProfile | undefined> {
    return Array.from(this.spiritualProfiles.values()).find(
      profile => profile.userId === userId
    );
  }

  async createSpiritualProfile(insertProfile: InsertSpiritualProfile): Promise<SpiritualProfile> {
    const id = randomUUID();
    const profile: SpiritualProfile = {
      ...insertProfile,
      id,
      spiritualPractices: insertProfile.spiritualPractices || [],
      sacredTexts: insertProfile.sacredTexts || [],
      verified: false,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.spiritualProfiles.set(id, profile);
    return profile;
  }

  async updateSpiritualProfile(id: string, updateData: Partial<SpiritualProfile>): Promise<SpiritualProfile | undefined> {
    const profile = this.spiritualProfiles.get(id);
    if (!profile) return undefined;

    const updatedProfile: SpiritualProfile = {
      ...profile,
      ...updateData,
      updatedAt: new Date()
    };
    this.spiritualProfiles.set(id, updatedProfile);
    return updatedProfile;
  }

  async searchProfiles(filters: ProfileFilter, excludeUserId?: string): Promise<SpiritualProfile[]> {
    let profiles = Array.from(this.spiritualProfiles.values()).filter(
      profile => profile.active && profile.userId !== excludeUserId
    );

    if (filters.ageMin) {
      profiles = profiles.filter(p => p.age >= filters.ageMin!);
    }
    if (filters.ageMax) {
      profiles = profiles.filter(p => p.age <= filters.ageMax!);
    }
    if (filters.state) {
      profiles = profiles.filter(p => p.state?.toLowerCase().includes(filters.state!.toLowerCase()));
    }
    if (filters.city) {
      profiles = profiles.filter(p => p.city?.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.motherTongue) {
      profiles = profiles.filter(p => p.motherTongue === filters.motherTongue);
    }
    if (filters.spiritualPractices && filters.spiritualPractices.length > 0) {
      profiles = profiles.filter(p => 
        filters.spiritualPractices!.some(practice => 
          (p.spiritualPractices || []).includes(practice)
        )
      );
    }
    if (filters.sacredTexts && filters.sacredTexts.length > 0) {
      profiles = profiles.filter(p => 
        filters.sacredTexts!.some(text => 
          (p.sacredTexts || []).includes(text)
        )
      );
    }
    if (filters.dietaryLifestyle) {
      profiles = profiles.filter(p => p.dietaryLifestyle === filters.dietaryLifestyle);
    }
    if (filters.guruLineage) {
      profiles = profiles.filter(p => 
        p.guruLineage?.toLowerCase().includes(filters.guruLineage!.toLowerCase())
      );
    }
    if (filters.education) {
      profiles = profiles.filter(p => p.education === filters.education);
    }
    if (filters.profession) {
      profiles = profiles.filter(p => p.profession === filters.profession);
    }
    if (filters.maritalStatus) {
      profiles = profiles.filter(p => p.maritalStatus === filters.maritalStatus);
    }
    if (filters.caste) {
      profiles = profiles.filter(p => p.caste === filters.caste);
    }
    if (filters.heightMin) {
      profiles = profiles.filter(p => p.height && p.height >= filters.heightMin!);
    }
    if (filters.heightMax) {
      profiles = profiles.filter(p => p.height && p.height <= filters.heightMax!);
    }
    if (filters.smokingHabits) {
      profiles = profiles.filter(p => p.smokingHabits === filters.smokingHabits);
    }
    if (filters.drinkingHabits) {
      profiles = profiles.filter(p => p.drinkingHabits === filters.drinkingHabits);
    }
    if (filters.eatingHabits) {
      profiles = profiles.filter(p => p.eatingHabits === filters.eatingHabits);
    }
    if (filters.physicalStatus) {
      profiles = profiles.filter(p => p.physicalStatus === filters.physicalStatus);
    }
    if (filters.bloodGroup) {
      profiles = profiles.filter(p => p.bloodGroup === filters.bloodGroup);
    }
    if (filters.healthConditions) {
      profiles = profiles.filter(p => p.healthConditions === filters.healthConditions);
    }
    if (filters.hivStatus) {
      profiles = profiles.filter(p => p.hivStatus === filters.hivStatus);
    }

    return profiles;
  }

  async getFeaturedProfiles(limit: number = 6): Promise<SpiritualProfile[]> {
    const profiles = Array.from(this.spiritualProfiles.values())
      .filter(profile => profile.active && profile.verified)
      .sort(() => Math.random() - 0.5);
    
    return profiles.slice(0, limit);
  }

  // Interest operations
  async createInterest(insertInterest: InsertInterest): Promise<Interest> {
    const id = randomUUID();
    const interest: Interest = {
      ...insertInterest,
      id,
      status: "sent",
      message: insertInterest.message || null,
      createdAt: new Date()
    };
    this.interests.set(id, interest);
    return interest;
  }

  async getInterest(fromProfileId: string, toProfileId: string): Promise<Interest | undefined> {
    return Array.from(this.interests.values()).find(
      interest => interest.fromProfileId === fromProfileId && interest.toProfileId === toProfileId
    );
  }

  async getInterestsByProfile(profileId: string): Promise<Interest[]> {
    return Array.from(this.interests.values()).filter(
      interest => interest.fromProfileId === profileId || interest.toProfileId === profileId
    );
  }

  async updateInterestStatus(id: string, status: string): Promise<Interest | undefined> {
    const interest = this.interests.get(id);
    if (!interest) return undefined;

    const updatedInterest: Interest = { ...interest, status };
    this.interests.set(id, updatedInterest);
    return updatedInterest;
  }

  // Quote operations
  async getRandomQuote(): Promise<InspirationalQuote | undefined> {
    const quotes = Array.from(this.quotes.values()).filter(q => q.isActive);
    if (quotes.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  async getAllQuotes(): Promise<InspirationalQuote[]> {
    return Array.from(this.quotes.values()).filter(q => q.isActive);
  }

  async createQuote(insertQuote: InsertInspirationalQuote): Promise<InspirationalQuote> {
    const id = randomUUID();
    const quote: InspirationalQuote = {
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

  private initializeQuotes() {
    const quotes = [
      {
        quoteText: "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः",
        translation: "Where women are honored, there the gods are pleased",
        source: "Manusmriti",
        chapter: "3",
        verse: "56"
      },
      {
        quoteText: "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ",
        translation: "In dharma, artha, kama and moksha, O best of Bharatas",
        source: "Mahabharata",
        chapter: "Vana Parva",
        verse: "33.6"
      },
      {
        quoteText: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
        translation: "May all beings be happy, may all beings be free from disease",
        source: "Upanishads",
        chapter: "Peace Mantra",
        verse: ""
      }
    ];

    quotes.forEach(quote => {
      const id = randomUUID();
      this.quotes.set(id, { ...quote, id, isActive: true });
    });
  }

  private initializeSampleProfiles() {
    // Create sample verified profiles for demonstration
    const sampleProfiles = [
      {
        userId: randomUUID(),
        name: "Arjun Sharma",
        age: 28,
        height: "5'8\"",
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
        healthConditions: "None",
        hivStatus: "Negative",
        medicalHistory: null
      },
      {
        userId: randomUUID(),
        name: "Sita Devi",
        age: 25,
        height: "5'4\"",
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
        hivStatus: "Negative",
        medicalHistory: null
      }
    ];

    sampleProfiles.forEach(profile => {
      const id = randomUUID();
      this.spiritualProfiles.set(id, {
        ...profile,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true
      });
    });
  }
}

export const storage = new MemStorage();
