# Netlify Deployment Guide for SattvikVivah

This guide explains how to deploy the SattvikVivah application to Netlify.

## Architecture Changes for Netlify

The original application was a full-stack Express.js app with server-side rendering. For Netlify deployment, we've made the following changes:

1. **Frontend-only Build**: The client React app is built as a static site
2. **Serverless Functions**: API endpoints are converted to Netlify Functions
3. **Static Hosting**: The app is served as a Single Page Application (SPA)

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Database**: Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway)
3. **Environment Variables**: Configure required environment variables

## Deployment Steps

### 1. Database Setup

Since Netlify doesn't support persistent databases, you'll need an external PostgreSQL service:

**Recommended Options:**
- **Supabase** (Free tier available)
- **Neon** (Free tier available)
- **Railway** (Free tier available)

### 2. Environment Variables

Set these environment variables in your Netlify dashboard:

```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Optional: Analytics and monitoring
NODE_ENV=production
```

### 3. Deploy to Netlify

#### Option A: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/public`
   - **Node version**: 18

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the client
npm run build:client

# Deploy
netlify deploy --prod --dir=dist/public
```

### 4. Configure Redirects

The `netlify.toml` file is already configured with:
- SPA routing (all routes redirect to index.html)
- API redirects to serverless functions
- Security headers
- Asset caching

## File Structure for Netlify

```
├── client/                 # React frontend
├── netlify/
│   └── functions/
│       └── api.ts         # Serverless API functions
├── server/                # Express server (not used in Netlify)
├── shared/                # Shared schemas and types
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## Build Process

1. **Client Build**: `npm run build:client` builds the React app to `dist/public`
2. **Serverless Functions**: API endpoints are handled by `netlify/functions/api.ts`
3. **Static Assets**: All assets are served from the `dist/public` directory

## API Endpoints

All API endpoints are available at `/.netlify/functions/api/*`:

- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `POST /api/profiles` - Create profile
- `GET /api/profiles/:id` - Get profile
- `PUT /api/profiles/:id` - Update profile
- `POST /api/search` - Search profiles
- `GET /api/featured` - Get featured profiles
- `POST /api/interests` - Create interest
- `GET /api/quotes` - Get inspirational quotes

## Limitations

1. **Cold Starts**: Serverless functions may have cold start delays
2. **Function Timeout**: Functions timeout after 10 seconds (free tier)
3. **Memory Limits**: 1024MB RAM limit per function
4. **No Persistent Storage**: Database must be external

## Performance Optimization

1. **CDN**: Netlify automatically serves static assets via CDN
2. **Caching**: Configured caching headers for assets
3. **Compression**: Automatic gzip compression
4. **Image Optimization**: Consider using Netlify's image optimization

## Monitoring and Debugging

1. **Function Logs**: View in Netlify dashboard under Functions tab
2. **Build Logs**: Available in deploy logs
3. **Analytics**: Enable Netlify Analytics for performance insights

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version and dependencies
2. **API Errors**: Verify environment variables and database connection
3. **Routing Issues**: Ensure `netlify.toml` redirects are configured correctly

### Debug Commands

```bash
# Test build locally
npm run build:client

# Test serverless function locally
netlify dev

# Check function logs
netlify functions:list
```

## Security Considerations

1. **CORS**: Configured for all origins (adjust as needed)
2. **Environment Variables**: Never commit sensitive data
3. **Input Validation**: All inputs are validated with Zod schemas
4. **Rate Limiting**: Consider implementing rate limiting for production

## Next Steps

1. Set up a production database
2. Configure custom domain
3. Set up monitoring and analytics
4. Implement authentication (if not already present)
5. Add error tracking (Sentry, etc.)

## Support

For issues specific to Netlify deployment:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [Netlify Community](https://community.netlify.com/)
