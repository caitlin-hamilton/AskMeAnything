import UserPost from "./UserPost";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe("PostTestComponent", () => {
  test("show answer on click", () => {
    render(
      <UserPost
        text={"Question"}
        answer={"Answer text"}
        submitter={"Caitlin"}
        votes={200}
        id={"1"}
        hasUserVoted={true}
        timePosted={1641225006000}
        incrementVote={() => {}}
        decrementVote={() => {}}
      ></UserPost>
    );
    expect(screen.queryByText('Answer text')).toBeNull()
    userEvent.click(screen.getByTestId("answerButton"));
    expect(screen.getByText("Answer text")).toBeInTheDocument()
  })


})
