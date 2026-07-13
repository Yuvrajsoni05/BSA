/**
 * Utility functions for authentication
 * Used by middleware and client-side auth checks
 */

/**
 * Check if a JWT token is expired
 * Basic check without verification (doesn't validate signature)
 * Use server-side verification for security-critical operations
 */
export function isTokenExpired(token: string): boolean {
  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    // Decode payload (base64url)
    const payload = JSON.parse(
      Buffer.from(
        parts[1].replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

    // Check expiration
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expirationTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
}

/**
 * Extract user ID from JWT token
 * Does NOT verify signature - use for UI purposes only
 */
export function getUserIdFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(
        parts[1].replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

    return payload.sub || payload.user_id || payload.id || null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if token should be refreshed
 * Returns true if token will expire in less than X minutes
 */
export function shouldRefreshToken(
  token: string,
  thresholdMinutes: number = 5
): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(
      Buffer.from(
        parts[1].replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

    const expirationTime = payload.exp * 1000;
    const now = Date.now();
    const timeUntilExpiry = expirationTime - now;
    const thresholdMs = thresholdMinutes * 60 * 1000;

    return timeUntilExpiry < thresholdMs;
  } catch (error) {
    return true;
  }
}

/**
 * Get time until token expiration (in seconds)
 */
export function getTokenTimeToExpiry(token: string): number | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      Buffer.from(
        parts[1].replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

    const expirationTime = payload.exp * 1000;
    const secondsUntilExpiry = Math.floor((expirationTime - Date.now()) / 1000);

    return secondsUntilExpiry > 0 ? secondsUntilExpiry : 0;
  } catch (error) {
    return null;
  }
}
