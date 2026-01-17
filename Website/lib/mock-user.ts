// Mock authenticated user data for citizen-facing pages
export const mockCitizenUser = {
  name: "Arjun Sharma",
  email: "arjun.sharma@email.com",
  credits: 2450,
  avatar: undefined, // Will use initials fallback
}

// Helper to simulate logout
export const handleLogout = () => {
  // In a real app, this would clear auth tokens and redirect
  window.location.href = "/"
}
