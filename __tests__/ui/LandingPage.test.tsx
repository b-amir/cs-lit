import { screen, render } from "@testing-library/react";
import { ShareSection } from "@/features/LandingPage/ShareSection";
import { TRPClientProvider } from "../utils/trpcWrapper";
import { expect, it } from "vitest";
import { ContentSection } from "@/components/Analogy/ContentSection";

it("should show 'Albert Einstein' to unregistered users as a default author name", () => {
  render(
    <TRPClientProvider withSessionProvider={false}>
      <ShareSection />
    </TRPClientProvider>
  );
  expect(screen.getByText(/Albert/i)).toBeInTheDocument();
});

it("renders ContentSection correctly", async () => {
  render(
    <ContentSection
      // @ts-ignore
      analogyData={{ id: "1", description: "heeeeey" }}
      analogyStatus="success"
    />,
    {
      wrapper: TRPClientProvider,
    }
  );

  const exampleAnalogy = await screen.findByText(/heeeeey/i);
  expect(exampleAnalogy).toBeInTheDocument();
});
