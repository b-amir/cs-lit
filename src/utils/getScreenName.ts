
export interface USER {
  name?: string | null | undefined;
  email?: string | null | undefined;
}
export function getScreenName(user: USER) {
  return user?.name ? user?.name : user?.email ? user?.email : "unknown"
}