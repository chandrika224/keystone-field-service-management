export interface JwtPayload {
  sub?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decodedPayload = atob(
      payload.replace(/-/g, "+").replace(/_/g, "/")
    );

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function getUserRole(token: string): string | null {
  const payload = decodeToken(token);

  if (!payload?.role) {
    return null;
  }

  return payload.role;
}

export function getUserEmail(token: string): string | null {
  const payload = decodeToken(token);

  return payload?.sub ?? null;
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);

  if (!payload?.exp) {
    return true;
  }

  return Date.now() >= payload.exp * 1000;
}