export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload["role"] || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  } catch {
    return null;
  }
}

export function isAdmin() {
  return getUserRole() === "Admin";
}
export function isUser() {
  return getUserRole() === "User";
}   