export const routeHandler = (item, type) => {
  if (type === "Topics") {
    return `/${item.category.name}/${item.title}`;
  } else if (type === "Categories") {
    return `/${item.name}`;
  } else if (type === "Users") {
    return `/profile/${item.id}`;
  } else if (type === "Analogies") {
    return `/${item.category.name}/${item.topic.title}/${item.id}`;
  } else return;
};
