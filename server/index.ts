import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    log('🚀 Starting server initialization...');
    log('🔧 About to register routes...');
    const server = await registerRoutes(app);
    log('📋 Routes registered successfully');
    log('✅ Server object created, proceeding with configuration...');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      log(`Error handled: ${message}`);
    });

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    const port = Number(process.env.PORT) || 5000;
    const host = process.env.HOST || "0.0.0.0";

    // Handle port conflicts gracefully
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`❌ Port ${port} is already in use. Server will exit.`);
        process.exit(1);
      } else {
        log(`❌ Server error: ${err.message}`);
        process.exit(1);
      }
    });

    // Graceful shutdown handling
    process.on('SIGINT', () => {
      log('Received SIGINT. Graceful shutdown...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      log('Received SIGTERM. Graceful shutdown...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    });

    log(`🔧 About to bind server to ${host}:${port}...`);
    log('🎯 Calling server.listen()...');
    server.listen(port, host, () => {
      log(`✅ Server running at http://${host}:${port}`);
      log(`🚀 Environment: ${app.get("env") || "development"}`);
      
      // Setup vite AFTER server is listening
      if (app.get("env") === "development") {
        setupVite(app, server).then(() => {
          log('🎨 Vite development server setup completed');
        }).catch((viteError) => {
          log(`⚠️  Vite setup error: ${viteError.message}`);
        });
      } else {
        serveStatic(app);
        log('📁 Static files serving enabled');
      }
      
      log(`🌐 Server is ready to accept connections`);
    });

  } catch (error) {
    log(`❌ Failed to start server: ${error}`);
    process.exit(1);
  }
})();