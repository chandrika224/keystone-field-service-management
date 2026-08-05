const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export function saveTokens(
  accessToken: string,
  refreshToken: string
) {
  localStorage.setItem(
    ACCESS_TOKEN,
    accessToken
  );

  localStorage.setItem(
    REFRESH_TOKEN,
    refreshToken
  );
}

export function getAccessToken() {
  return localStorage.getItem(
    ACCESS_TOKEN
  );
}

export function getRefreshToken() {
  return localStorage.getItem(
    REFRESH_TOKEN
  );
}

export function clearTokens() {
  localStorage.removeItem(
    ACCESS_TOKEN
  );

  localStorage.removeItem(
    REFRESH_TOKEN
  );
}