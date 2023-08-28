export const routeHandler = (item, type) => {
  if (type === "Topics") {
    return `/${item?.category?.slug}/${item?.slug}`;
  } else if (type === "Categories") {
    return `/${item?.slug}`;
  } else if (type === "Users") {
    return `/profile/${item?.id}`;
  } else if (type === "Analogies") {
    return `/${item?.category?.slug}/${item?.topic?.slug}/${item?.id}`;
  } else if (type === "Comments") {
    return "/";
  } else return;
};
