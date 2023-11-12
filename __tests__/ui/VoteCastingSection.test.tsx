import { delay } from "@/utils/delay";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { TRPClientProvider } from "../utils/trpcWrapper";
import { VoteCastingSection } from "@/components/Analogy/HeaderSection";

describe("VoteCastingSection", () => {
  it("should be able to see voting buttons", async () => {
    render(
      <TRPClientProvider>
        <VoteCastingSection analogyId="test" />
      </TRPClientProvider>
    );

    const likeButton = await screen.findByTestId("like-button");
    const dislikeButton = await screen.findByTestId("dislike-button");

    expect(likeButton).toBeInTheDocument();
    expect(dislikeButton).toBeInTheDocument();
  });

  it("should render correctly when the user has disliked the analogy", async () => {
    const { queryByTestId } = render(<VoteCastingSection analogyId="test" />, {
      wrapper: TRPClientProvider,
    });
    // @ts-ignore
    userEvent.click(queryByTestId("dislike-button"));
    await delay(100);
    expect(queryByTestId("like-button")).toHaveClass("text-gray-400");
    expect(queryByTestId("dislike-button")).toHaveClass("text-red-400");
  });

  it("should render correctly when the user has not yet voted", () => {
    const { queryByTestId } = render(<VoteCastingSection analogyId="0" />, {
      wrapper: TRPClientProvider,
    });

    expect(queryByTestId("like-button")).toHaveClass("text-gray-400");
    expect(queryByTestId("dislike-button")).toHaveClass("text-gray-400");
  });

  it("should render correctly when the user has liked the analogy", async () => {
    const { queryByTestId } = render(<VoteCastingSection analogyId="0" />, {
      wrapper: TRPClientProvider,
    });

    // @ts-ignore
    userEvent.click(queryByTestId("like-button"));
    await delay(100);

    expect(queryByTestId("like-button")).toHaveClass("text-green-400");
    expect(queryByTestId("dislike-button")).toHaveClass("text-gray-400");
  });

  it("should render correctly when the user has disliked the analogy", async () => {
    const { queryByTestId } = render(<VoteCastingSection analogyId="0" />, {
      wrapper: TRPClientProvider,
    });

    // @ts-ignore
    userEvent.click(queryByTestId("dislike-button"));
    await delay(100);
    expect(queryByTestId("like-button")).toHaveClass("text-gray-400");
    expect(queryByTestId("dislike-button")).toHaveClass("text-red-400");
  });
});
