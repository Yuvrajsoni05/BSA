import { NextRequest, NextResponse } from "next/server";

interface VerifyResponse {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/**
 * GET /api/auth/verify
 * Verifies the user's access token and returns user info
 * Currently returns mock data - will be replaced with real backend
 */
export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Mock token verification - replace with real backend call later
    // In production, this would:
    // 1. Verify JWT signature
    // 2. Check token expiration
    // 3. Look up user in database
    // 4. Return user info

    if (token.startsWith("mock_access_token_")) {
      const response: VerifyResponse = {
        userId: "user_123",
        email: "demo@example.com",
        name: "Demo User",
        role: "user",
      };

      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
