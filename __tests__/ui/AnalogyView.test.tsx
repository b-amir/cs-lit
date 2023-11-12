import { render, screen } from "@testing-library/react";
import { AnalogyView } from "@/components/Analogy/AnalogyView";
import { TRPClientProvider } from "../utils/trpcWrapper";

it("should render loading state when analogyData is undefined", async () => {
  const analogyProps = {
    id: "1",
    analogy: {
      id: "1",
      title: "title",
      description: "description",
      reference: "reference",
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "1",
      topicId: "1",
    },
    analogyData: undefined,
    analogyStatus: "loading",
    needsInfoRow: false,
    needsLocationInfo: false,
    setAnalogyInput: vi.fn(),
    votingAverage: 0,
    votingStatus: "loading",
  };

  render(<AnalogyView {...analogyProps} />, { wrapper: TRPClientProvider });

  const headerSection = screen.getByTestId("analogy-view");
  const contentSection = screen.getByTestId("analogy-content");
  const skeletonLoading = screen.getByTestId("skeleton");

  expect(headerSection).toBeInTheDocument();
  expect(contentSection).toBeInTheDocument();
  expect(skeletonLoading).toBeInTheDocument();
});
