import { apiError } from "@/lib/auth/guard";

type MappedError = {
  message: string;
  status: number;
};

export function mapDbError(error: unknown, fallback: string): MappedError {
  if (error instanceof Error) {
    if (error.message.includes("MONGODB_URI")) {
      return {
        message: "Database is not configured. Set MONGODB_URI in the server environment.",
        status: 503,
      };
    }

    const mongoError = error as Error & { code?: number };
    if (mongoError.code === 11000) {
      return {
        message: "A record with this identifier already exists.",
        status: 409,
      };
    }

    if (error.name === "ValidationError") {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  return { message: fallback, status: 500 };
}

export function dbErrorResponse(error: unknown, fallback: string) {
  const mapped = mapDbError(error, fallback);
  return apiError(mapped.message, mapped.status);
}
