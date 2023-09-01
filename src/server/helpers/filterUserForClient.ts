interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  _count: {
    analogies: number;
  } | null;
}

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.image,
  };
};

export const filterUsersForClient = (users: User[]) => {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name ? user.name : user.email,
      analogiesCount: user._count?.analogies,
    };
  }
  );

}
