import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertSpiritualProfileSchema,
  insertInterestSchema,
  profileFilterSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, mobile, password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      let user;
      if (email) {
        // Email login
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format" });
        }
        user = await storage.getUserByEmail(email);
      } else if (mobile) {
        // Mobile login
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
          return res.status(400).json({ error: "Invalid mobile number format" });
        }
        user = await storage.getUserByMobile(mobile);
      } else {
        return res.status(400).json({ error: "Email or mobile number is required" });
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Here you would verify the password (implement password hashing/comparison)
      // For now, we'll just return success
      res.json({
        user: {
          id: user.id,
          email: user.email,
          profileFor: user.profileFor,
          gender: user.gender
        },
        message: "Login successful"
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
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

  app.get("/api/users/:id", async (req, res) => {
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

  // Profile routes
  app.post("/api/profiles", async (req, res) => {
    try {
      const profileData = insertSpiritualProfileSchema.parse(req.body);

      // Check if profile already exists for this user
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

  app.get("/api/profiles/:id", async (req, res) => {
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

  app.get("/api/profiles/user/:userId", async (req, res) => {
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

  app.put("/api/profiles/:id", async (req, res) => {
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

  // Search profiles
  app.post("/api/profiles/search", async (req, res) => {
    try {
      const filters = profileFilterSchema.parse(req.body.filters || {});
      const excludeUserId = req.body.excludeUserId;

      const profiles = await storage.searchProfiles(filters, excludeUserId);
      res.json({ profiles });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid search filters" });
    }
  });

  // Featured profiles
  app.get("/api/profiles/featured/:limit?", async (req, res) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : 6;
      const profiles = await storage.getFeaturedProfiles(limit);
      res.json({ profiles });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured profiles" });
    }
  });

  // Interest routes
  app.post("/api/interests", async (req, res) => {
    try {
      const interestData = insertInterestSchema.parse(req.body);

      // Check if interest already exists
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

  app.get("/api/interests/profile/:profileId", async (req, res) => {
    try {
      const interests = await storage.getInterestsByProfile(req.params.profileId);
      res.json({ interests });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interests" });
    }
  });

  app.put("/api/interests/:id/status", async (req, res) => {
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

  // Inspirational quotes
  app.get("/api/quotes/random", async (req, res) => {
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

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json({ quotes });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  // Static data endpoints
  app.get("/api/spiritual-practices", (req, res) => {
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

  app.get("/api/sacred-texts", (req, res) => {
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

  app.get("/api/countries", (req, res) => {
    const countries = [
      { value: "IN", label: "India" },
      { value: "US", label: "United States" },
      { value: "CA", label: "Canada" },
      { value: "GB", label: "United Kingdom" },
      { value: "AU", label: "Australia" },
      { value: "NZ", label: "New Zealand" },
      { value: "SG", label: "Singapore" },
      { value: "AE", label: "United Arab Emirates" },
      { value: "DE", label: "Germany" },
      { value: "FR", label: "France" },
      { value: "NL", label: "Netherlands" },
      { value: "SE", label: "Sweden" },
      { value: "CH", label: "Switzerland" },
      { value: "JP", label: "Japan" },
      { value: "MY", label: "Malaysia" },
      { value: "TH", label: "Thailand" },
      { value: "ZA", label: "South Africa" },
    ];
    res.json({ countries });
  });

  app.get("/api/states", (req, res) => {
    const { country } = req.query;

    const statesByCountry: Record<string, string[]> = {
      IN: [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
        "Jammu and Kashmir", "Ladakh", "Puducherry"
      ],
      US: [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
        "Wisconsin", "Wyoming"
      ],
      CA: [
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
        "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
        "Quebec", "Saskatchewan", "Yukon"
      ],
      GB: ["England", "Scotland", "Wales", "Northern Ireland"],
      AU: [
        "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
        "South Australia", "Tasmania", "Victoria", "Western Australia"
      ]
    };

    const states = statesByCountry[country as string] || statesByCountry.IN;
    res.json({ states });
  });

  app.get("/api/cities", (req, res) => {
    const { state } = req.query;

    const citiesByState: Record<string, string[]> = {
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Shimoga"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"],
      "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi"],
      "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno"],
      "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"],
      "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London"],
      "England": ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield"]
    };

    const cities = citiesByState[state as string] || [];
    res.json({ cities });
  });

  app.get("/api/languages", (req, res) => {
    const languages = [
      "Hindi", "Bengali", "Tamil", "Telugu", "Gujarati", "Marathi", "Kannada",
      "Malayalam", "Punjabi", "Oriya", "Assamese", "Urdu", "Sanskrit", "English"
    ];
    res.json({ languages });
  });

  const httpServer = createServer(app);
  return httpServer;
}