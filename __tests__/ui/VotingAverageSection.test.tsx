import { render } from "@testing-library/react";
import { VotingAverageSection } from "@/components/Analogy/HeaderSection";

describe("VotingAverageSection", () => {
  it("should render 'has no votes yet' when votingAverage is NaN", () => {
    const { getByText } = render(<VotingAverageSection votingAverage={NaN} />);
    expect(getByText("has no votes yet")).toBeInTheDocument();
  });

  it("should render 'Needs improvement' when votingAverage is -2", () => {
    const { getByText } = render(<VotingAverageSection votingAverage={-2} />);
    expect(getByText("Needs improvement")).toBeInTheDocument();
  });

  it("should render 'Half decent' when votingAverage is -1", () => {
    const { getByText } = render(<VotingAverageSection votingAverage={-1} />);
    expect(getByText("Half decent")).toBeInTheDocument();
  });
});
