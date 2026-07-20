import { NextRequest, NextResponse } from "next/server";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  message?: string;
}

/**
 * POST /api/auth/register
 * Handles user registration with name, email, and password
 * Currently returns mock data - will be replaced with real backend
 */
export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();

    // Validate input
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength (minimum 8 characters, uppercase, number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(body.password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters with uppercase letter and number",
        },
        { status: 400 }
      );
    }

    // Mock registration - replace with real backend call later
    // In production, this would:
    // 1. Check if email already exists
    // 2. Hash password
    // 3. Create user in database
    // 4. Send verification email

    const response: RegisterResponse = {
      id: "user_" + Date.now(),
      email: body.email,
      name: body.name,
      message: "Account created successfully. Please log in to continue.",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
