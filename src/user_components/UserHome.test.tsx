import UserHome from "./UserHome";
import { getQuestionData, getVoteData } from "../api";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

function getTestData() {
  let data = getQuestionData();
  return [data[0]];
}

describe("HomeTestComponentReactTestingLibrary", () => {

  test("User has already voted so decrement", () => {
    render(
      <UserHome
        getQuestions={getTestData}
        getUserData={getVoteData}
        userId={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
      ></UserHome>
    );
    expect(screen.getByRole('Voted')).toBeInTheDocument()
    expect(screen.queryByRole('notVoted')).toBeNull()
    expect(screen.getByTestId('numVotes')).toHaveTextContent("5")
    userEvent.click(screen.getByRole('Voted'));
    expect(screen.getByRole('notVoted')).toBeInTheDocument()
    expect(screen.queryByRole('Voted')).toBeNull()
    expect(screen.getByTestId('numVotes')).toHaveTextContent("4")
    userEvent.click(screen.getByRole('notVoted')); 
    //the reason why we add an extra click to set userHome to original state, bug has been raised
    //https://github.com/testing-library/react-testing-library/issues/716 
  });

  test("User has not already voted so increment", () => {
    render(<UserHome
      getQuestions={getTestData}
      getUserData={getVoteData}
      userId={"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"}
    ></UserHome>);
    expect(screen.getByRole('notVoted')).toBeInTheDocument()
    expect(screen.queryByRole('Voted')).toBeNull()
    expect(screen.getByTestId('numVotes')).toHaveTextContent("5")
    userEvent.click(screen.getByRole('notVoted'));
    expect(screen.getByRole('Voted')).toBeInTheDocument()
    expect(screen.queryByRole('notVoted')).toBeNull()
    expect(screen.getByTestId('numVotes')).toHaveTextContent("6")
    userEvent.click(screen.getByRole('Voted'));
  });

});