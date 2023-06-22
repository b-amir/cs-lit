
// clerk way
// import type { User } from "@clerk/nextjs/api";

// next-auth way of importing User type
import type { User } from "next-auth";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.image,
  };
};