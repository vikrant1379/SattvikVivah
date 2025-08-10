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
import { countries, statesByCountry, citiesByState } from "../client/src/data/locations.js";
import crypto from 'crypto';

export async function registerRoutes(app: Express): Promise<Server> {
  

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

      // Process caste combinations if both groups and subcastes are selected
      if (filters.casteGroups?.length && filters.casteSubcastes?.length) {
        const combinedCastes: string[] = [];

        const hasAllGroups = filters.casteGroups.includes("All");
        const hasAllSubcastes = filters.casteSubcastes.includes("All");

        if (hasAllGroups && hasAllSubcastes) {
          // If both "All" are selected, don't filter by caste at all
          filters.combinedCastes = [];
        } else if (hasAllGroups) {
          // All groups, specific subcastes
          filters.casteSubcastes.filter(s => s !== "All").forEach(subcaste => {
            combinedCastes.push(subcaste);
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        } else if (hasAllSubcastes) {
          // Specific groups, all subcastes
          filters.casteGroups.filter(g => g !== "All").forEach(group => {
            combinedCastes.push(group);
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        } else {
          // Specific groups and specific subcastes
          filters.casteGroups.forEach(group => {
            if (group !== "All") {
              filters.casteSubcastes?.forEach(subcaste => {
                if (subcaste !== "All") {
                  // Create combination like "Brahmin - Iyer" or "Rajput - Chauhan"
                  combinedCastes.push(`${group} - ${subcaste}`);
                  // Also include just the subcaste for broader matching
                  combinedCastes.push(subcaste);
                }
              });
            }
          });
          filters.combinedCastes = [...new Set(combinedCastes)];
        }
      } else if (filters.casteGroups?.length) {
        // Only groups selected
        const hasAllGroups = filters.casteGroups.includes("All");
        if (hasAllGroups) {
          filters.combinedCastes = [];
        } else {
          filters.combinedCastes = filters.casteGroups.filter(group => group !== "All");
        }
      } else if (filters.casteSubcastes?.length) {
        // Only subcastes selected
        const hasAllSubcastes = filters.casteSubcastes.includes("All");
        if (hasAllSubcastes) {
          filters.combinedCastes = [];
        } else {
          filters.combinedCastes = filters.casteSubcastes.filter(subcaste => subcaste !== "All");
        }
      }

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
    res.json({ countries });
  });

  app.get("/api/states", (req, res) => {
    const { country } = req.query;
    const states = statesByCountry[country as string] || [];
    res.json({ states });
  });

  app.get("/api/cities", (req, res) => {
    const { state } = req.query;
    const cities = citiesByState[state as string] || [];
    res.json({ cities });
  });

  app.get("/api/languages", (req, res) => {
    const languages = [
      "Hindi", "Bengali", "Tamil", "Telugu", "Gujarati", "Marathi",
      "Punjabi", "Malayalam", "Kannada", "English", "Urdu", "Odia",
      "Assamese", "Other"
    ];
    res.json({ languages });
  });

  // Mock Authentication routes
  app.post('/api/auth/login', (req, res) => {
    const { email, mobile, password, otp, stayLoggedIn } = req.body;

    // Mock authentication logic
    if (password === 'demo123' || otp === '123456') {
      const user = {
        id: crypto.randomBytes(16).toString('hex'),
        firstName: 'Demo',
        lastName: 'User',
        email: email || 'demo@example.com',
        mobile: mobile || '9876543210',
        isVerified: true
      };

      const token = crypto.randomBytes(32).toString('hex');

      res.json({
        success: true,
        user,
        token,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  });

  app.post('/api/auth/signup', (req, res) => {
    const userData = req.body;

    // Mock signup logic
    const user = {
      id: crypto.randomBytes(16).toString('hex'),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      isVerified: false
    };

    const token = crypto.randomBytes(32).toString('hex');

    res.json({
      success: true,
      user,
      token,
      message: 'Account created successfully'
    });
  });

  app.post('/api/auth/send-otp', (req, res) => {
    const { contactMethod } = req.body;

    // Mock OTP sending
    console.log(`Sending OTP to: ${contactMethod}`);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });
  });

  app.post('/api/auth/verify-otp', (req, res) => {
    const { contactMethod, otp } = req.body;

    // Mock OTP verification
    if (otp === '123456') {
      const user = {
        id: '1',
        firstName: 'OTP',
        lastName: 'User',
        email: contactMethod.includes('@') ? contactMethod : 'otp@example.com',
        mobile: contactMethod.includes('@') ? '9876543210' : contactMethod,
        isVerified: true
      };

      const token = crypto.randomBytes(32).toString('hex');

      res.json({
        success: true,
        user,
        token,
        message: 'OTP verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
  });

  app.post('/api/auth/reset-password', (req, res) => {
    const { contactMethod, otp, newPassword } = req.body;

    // Mock password reset
    if (otp === '123456' && newPassword.length >= 8) {
      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP or password requirements not met'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}