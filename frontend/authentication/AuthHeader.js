import { authenticationService } from "./authenticationService";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  console.log(currentUser);
  if (currentUser && currentUser.accessToken) {
    return { Authorization: `Bearer ${currentUser.accessToken}` };
  } else {
    return {};
  }
}
