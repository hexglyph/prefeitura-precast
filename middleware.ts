import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req: NextRequest) {
    // Pass-through: allow access without enforcing login
    return NextResponse.next()
  },
  {
    callbacks: {
      // Temporarily allow all requests without a session/token
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: [
    // protect all app routes except public assets and api auth
    "/((?!_next|api/auth|public|images|favicon.ico).*)",
  ],
}
