import UserHome from "./UserHome";
import { getQuestionData, getVoteData } from "../api";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { within } from "@testing-library/react";

function getTestData() {
  let data = getQuestionData();
  return [data[0]];
}

//enzyme tests
Enzyme.configure({ adapter: new Adapter() });

describe("HomeTestComponent", () => {
  test("Render voted or not voted on click", () => {
    const wrapper = mount(
      <UserHome
        getQuestions={getTestData}
        getUserData={getVoteData}
        userId={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
      ></UserHome>
    );
    const votedButton = wrapper.find(FaThumbsUp);

    expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy();
    expect(wrapper.find(".voteP").text()).toBe("5");

    votedButton.at(0).simulate("click");
    let newNumOfVotes = wrapper.find(".voteP").text();

    expect(wrapper.find(FaRegThumbsUp).exists()).toBeTruthy();
    expect(newNumOfVotes).toBe("4");

    wrapper.find(FaRegThumbsUp).at(0).simulate("click");
    newNumOfVotes = wrapper.find(".voteP").text();

    expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy();
    expect(newNumOfVotes).toBe("5");
  });
});

//react testing library

describe("HomeTestComponentReactTestingLibrary", () => {
  test("User has already voted so decrement", () => {
    const { getByTestId } = render(
      <UserHome
        getQuestions={getTestData}
        getUserData={getVoteData}
        userId={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
      ></UserHome>
    );
    const { getByText } = within(getByTestId("num-of-votes"));
    expect(getByText("5")).toBeInTheDocument();
    fireEvent.click(getByTestId("btn-decr"));
    expect(getByText("4")).toBeInTheDocument();
  });
  test("User has not already voted so increment", () => {
    const { getByTestId } = render(
      <UserHome
        getQuestions={getTestData}
        getUserData={getVoteData}
        userId={""}
      ></UserHome>
    );
    const { getByText } = within(getByTestId("num-of-votes"));
    expect(getByText("5")).toBeInTheDocument();
    fireEvent.click(getByTestId("btn-incr"));
    expect(getByText("6")).toBeInTheDocument();
  });
});
