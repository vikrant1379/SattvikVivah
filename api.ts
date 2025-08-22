import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';
import { storage } from '../../server/storage';
import {
  insertInterestSchema,
  insertSpiritualProfileSchema,
  insertUserSchema,
  profileFilterSchema
} from '../../shared/schema';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  const { path, httpMethod, body } = event;
  const pathSegments = path.replace('/.netlify/functions/api', '').split('/').filter(Boolean);

  try {
    // User routes
    if (pathSegments[0] === 'users') {
      if (httpMethod === 'POST' && pathSegments.length === 1) {
        // POST /api/users
        const userData = insertUserSchema.parse(JSON.parse(body || '{}'));
        const existingUser = await storage.getUserByEmail(userData.email);
        if (existingUser) {
          return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: "User with this email already exists" }),
          };
        }
        const user = await storage.createUser(userData);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ user: { id: user.id, email: user.email, profileFor: user.profileFor, gender: user.gender } }),
        };
      }

      if (httpMethod === 'GET' && pathSegments.length === 2) {
        // GET /api/users/:id
        const user = await storage.getUser(pathSegments[1]);
        if (!user) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: "User not found" }),
          };
        }
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ user: { id: user.id, email: user.email, profileFor: user.profileFor, gender: user.gender } }),
        };
      }
    }

    // Profile routes
    if (pathSegments[0] === 'profiles') {
      if (httpMethod === 'POST' && pathSegments.length === 1) {
        // POST /api/profiles
        const profileData = insertSpiritualProfileSchema.parse(JSON.parse(body || '{}'));
        const existingProfile = await storage.getProfileByUserId(profileData.userId);
        if (existingProfile) {
          return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Profile already exists for this user" }),
          };
        }
        const profile = await storage.createSpiritualProfile(profileData);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ profile }),
        };
      }

      if (httpMethod === 'GET' && pathSegments.length === 2) {
        // GET /api/profiles/:id
        const profile = await storage.getSpiritualProfile(pathSegments[1]);
        if (!profile) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Profile not found" }),
          };
        }
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ profile }),
        };
      }

      if (httpMethod === 'GET' && pathSegments.length === 3 && pathSegments[1] === 'user') {
        // GET /api/profiles/user/:userId
        const profile = await storage.getProfileByUserId(pathSegments[2]);
        if (!profile) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Profile not found for this user" }),
          };
        }
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ profile }),
        };
      }

      if (httpMethod === 'PUT' && pathSegments.length === 2) {
        // PUT /api/profiles/:id
        const updateData = JSON.parse(body || '{}');
        const profile = await storage.updateSpiritualProfile(pathSegments[1], updateData);
        if (!profile) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Profile not found" }),
          };
        }
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ profile }),
        };
      }
    }

    // Search profiles
    if (pathSegments[0] === 'search' && httpMethod === 'POST') {
      const filters = profileFilterSchema.parse(JSON.parse(body || '{}'));
      const profiles = await storage.searchProfiles(filters);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ profiles }),
      };
    }

    // Featured profiles
    if (pathSegments[0] === 'featured' && httpMethod === 'GET') {
      const limit = pathSegments[1] ? parseInt(pathSegments[1]) : 10;
      const profiles = await storage.getFeaturedProfiles(limit);
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ profiles }),
      };
    }

    // Interest routes
    if (pathSegments[0] === 'interests') {
      if (httpMethod === 'POST' && pathSegments.length === 1) {
        // POST /api/interests
        const interestData = insertInterestSchema.parse(JSON.parse(body || '{}'));
        const interest = await storage.createInterest(interestData);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ interest }),
        };
      }

      if (httpMethod === 'GET' && pathSegments.length === 2) {
        // GET /api/interests/:profileId
        const interests = await storage.getInterestsByProfile(pathSegments[1]);
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ interests }),
        };
      }

      if (httpMethod === 'PUT' && pathSegments.length === 2) {
        // PUT /api/interests/:id
        const { status } = JSON.parse(body || '{}');
        const interest = await storage.updateInterestStatus(pathSegments[1], status);
        if (!interest) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Interest not found" }),
          };
        }
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ interest }),
        };
      }
    }

    // Inspirational quotes
    if (pathSegments[0] === 'quotes') {
      if (httpMethod === 'GET' && pathSegments.length === 1) {
        // GET /api/quotes
        const quotes = await storage.getAllQuotes();
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ quotes }),
        };
      }

      if (httpMethod === 'GET' && pathSegments.length === 2 && pathSegments[1] === 'random') {
        // GET /api/quotes/random
        const quote = await storage.getRandomQuote();
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ quote }),
        };
      }
    }

    // 404 for unmatched routes
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Route not found" }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
    };
  }
};

export { handler };
