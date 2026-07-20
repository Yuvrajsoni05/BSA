import { NextRequest, NextResponse } from "next/server";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * POST /api/auth/login
 * Handles user login with email and password
 * Currently returns mock data - will be replaced with real backend
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Mock authentication - replace with real backend call later
    if (body.email === "demo@example.com" && body.password === "Password123") {
      const response: LoginResponse = {
        access: "mock_access_token_" + Date.now(),
        refresh: "mock_refresh_token_" + Date.now(),
        user: {
          id: "user_123",
          email: body.email,
          name: "Demo User",
        },
      };

      return NextResponse.json(response, { status: 200 });
    }

    // Invalid credentials
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
