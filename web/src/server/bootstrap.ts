import { connectDatabase } from "./config/db";
import { env } from "./config/env";
import { verifyMailerConnection } from "./config/mailer";
import { seedAdminIfNotExists, seedContentIfEmpty } from "./scripts/seed";
import { logger } from "./utils/logger";

let initialized = false;
let initPromise: Promise<void> | null = null;
let startupTasksPromise: Promise<void> | null = null;

function runStartupTasksOnce() {
  if (startupTasksPromise) return startupTasksPromise;

  startupTasksPromise = (async () => {
    if (env.NODE_ENV === "production") {
      try {
        await seedAdminIfNotExists();
      } catch (error) {
        logger.warn(
          "Admin startup seed failed. Continuing startup.",
          error instanceof Error ? error.message : String(error),
        );
      }

      if (env.SEED_DUMMY_ON_STARTUP) {
        try {
          await seedContentIfEmpty();
        } catch (error) {
          logger.warn(
            "Content startup seed failed. Continuing startup.",
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    }

    try {
      await verifyMailerConnection();
    } catch (error) {
      logger.warn("Mail provider verification failed. Continuing startup.", error instanceof Error ? error.message : String(error));
    }
  })().catch((error) => {
    logger.warn("Background startup tasks failed.", error instanceof Error ? error.message : String(error));
    startupTasksPromise = null;
    throw error;
  });

  return startupTasksPromise;
}

export async function ensureServerInitialized() {
  if (initialized) {
    void runStartupTasksOnce();
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      const startedAt = Date.now();
      await connectDatabase();
      initialized = true;
      logger.info(`Next.js API backend initialized in ${Date.now() - startedAt}ms`);

      // Run non-critical startup work without blocking API responses.
      void runStartupTasksOnce();
    })().catch((error) => {
      initPromise = null;
      throw error;
    });
  }

  return initPromise;
}
