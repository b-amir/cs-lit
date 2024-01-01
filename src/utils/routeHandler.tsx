export const routeHandler = (item: any, type: string) => {
  if (type === "Topics") {
    return `/${item?.category?.slug}/${item?.slug}`;
  } else if (type === "Categories") {
    return `/${item?.slug}`;
  } else if (type === "Users") {
    return `/profile/${item?.id}`;
  } else if (type === "Analogies") {
    return `/${item?.category?.slug}/${item?.topic?.slug}/${item?.id}`;
  } else if (type === "Comments") {
    return `/_/_/${item?.analogyId}`; // this still does the job without attaching a bunch of data to comment object
  } else return;
};
