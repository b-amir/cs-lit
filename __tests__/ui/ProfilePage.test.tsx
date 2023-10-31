import { expect, test } from "vitest";
import { ProfileHeader } from "@/pages/profile/[id].page";
import { render, screen } from "@testing-library/react";
import { TRPClientProvider } from "../utils/trpcWrapper";

test("renders user name correctly on profile page's header", async () => {
  render(
    <TRPClientProvider>
      <ProfileHeader
        profileData={{
          id: "1",
          name: "John Doe",
          email: "",
          profileImageUrl: null,
        }}
      />
    </TRPClientProvider>
  );

  const username = await screen.findByText(/John/i);
  expect(username).toBeInTheDocument();
});

// test("profile page renders correctly", async () => {
//   render(
//     <Provider store={store}>
//       <AnalogiesFeed
//         isProfile={true}
//         analogies={{
//           pages: [
//             {
//               items: [
//                 {
//                   id: "1",
//                   description: "Analogy 1",
//                   createdAt: new Date(),
//                   updatedAt: new Date(),
//                   authorId: "1",
//                   reference: "https://google.com",
//                   status: "PUBLISHED",
//                   title: "Analogy 1",
//                   topicId: "1",

//                   user: {
//                     id: "1",
//                     name: "John Doe",
//                     email: "",
//                     profileImageUrl: null,
//                   },
//                 },
//               ],
//             },
//           ],
//         }}
//         hasNextPage={false}
//         fetchNextPage={vi.fn()}
//         isFetchingNextPage={false}
//         fetchingStatus="success"
//         setAnalogyInput={vi.fn()}
//       />
//     </Provider>
//   );
//   const username = await screen.findByText(/John/i);
//   expect(username).toBeInTheDocument();
// });
