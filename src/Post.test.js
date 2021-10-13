import React from 'react';
import renderer from 'react-test-renderer';
import Post from './Post';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ImReply} from "react-icons/im";
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";

Enzyme.configure({adapter: new Adapter()});

describe('MyComponent', () => {
    test('practice', () => {
        const wrapper = shallow(<Post text={"Question"} answer={"Answer text"} hasAnswer={true} poster={"Caitlin"} votes={200} id={1} hasUserVoted={true}/>)
        const text = wrapper.find('.userQuestion');
        expect(text.text()).toBe('Question')
    })
    test('show answer on click', () => {
        const wrapper = shallow(<Post text={"Question"} answer={"Answer text"} hasAnswer={true} poster={"Caitlin"} votes={200} id={1} hasUserVoted={true}/>)
        const button = wrapper.find(ImReply)
        expect(wrapper.contains('.answerDiv p')).toBe(false)
        button.simulate('click')
        const answerText = wrapper.find('.answerDiv p')
        expect(answerText.text()).toBe('Answer text')
    })
    test('render vote button on click', () => {
        const wrapper = shallow(<Post text={"Question"} answer={"Answer text"} hasAnswer={true} poster={"Caitlin"} votes={200} id={1} hasUserVoted={true}/>)
        const votedButton = wrapper.find('FaThumbsUp');
        expect(wrapper.contains(<FaRegThumbsUp />)).toBe(false)
        const numOfVotes = wrapper.find('.voteP').text()
        expect(numOfVotes).toBe("200")
        votedButton.simulate('click')
        const newNumOfVotes = wrapper.find('.voteP').text()
        expect(wrapper.contains(<FaThumbsUp />)).toBe(false)
        expect(wrapper.contains(<FaRegThumbsUp />)).toBe(true)
        expect(newNumOfVotes).toBe("199")
    })
})