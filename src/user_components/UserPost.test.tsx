import React from "react";
import UserPost from "./UserPost";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Button from "@material-ui/core/Button";
import { render, screen } from "@testing-library/react";

//enzyme tests

Enzyme.configure({ adapter: new Adapter() });

describe("PostTestComponent", () => {
  test("show answer on click", () => {
    const wrapper = shallow(
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
      />
    );
    expect(wrapper.find(".answerDiv p").length).toBe(0);
    expect(wrapper.find(Button).text()).toBe("Show Answer");
    wrapper.find(Button).simulate("click");
    expect(wrapper.find(".answerDiv p").length).toBe(1);
    expect(wrapper.find(Button).text()).toBe("Hide Answer");
  });
})