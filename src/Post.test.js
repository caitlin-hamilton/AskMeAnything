import React from 'react';
import Post from './Post';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ImReply} from "react-icons/im";

Enzyme.configure({adapter: new Adapter()});

describe('PostTestComponent', () => {
    test('show answer on click', () => {
        const wrapper = shallow(<Post text={"Question"} answer={"Answer text"} hasAnswer={true} poster={"Caitlin"} votes={200} id={1} hasUserVoted={true}/>)
        const button = wrapper.find(ImReply)
        button.simulate('click')
        const answerText = wrapper.find('.answerDiv p')
        expect(answerText.text()).toBe('Answer text')
    })
})