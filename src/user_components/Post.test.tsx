import React from 'react';
import UserPost from './UserPost';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Button from '@material-ui/core/Button';
import {render, screen} from '@testing-library/react'

//enzyme tests

Enzyme.configure({adapter: new Adapter()});

describe('PostTestComponent', () => {
    test('show answer on click', () => {
        const wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641225006000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('.answerDiv p').length).toBe(0)
        expect(wrapper.find(Button).text()).toBe('Show Answer')
        wrapper.find(Button).simulate('click')
        expect(wrapper.find('.answerDiv p').length).toBe(1)
        expect(wrapper.find(Button).text()).toBe('Hide Answer')
    })
    test('format time over different hours', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(1641304800000));
        //Current time is 14:00

        //time submitted is 14:00
        let wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641304800000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 0 sec. ago')

        //submitted at 13:59:55
        wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641304795000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 5 sec. ago')

        // //time submitted is 13:30
        wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641303001000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 30 min. ago')

        //time submitted is 12:30
        wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641299401000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 1 hr. ago')

        //time submitted is 23 hours ago 
        wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641214801000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 1 day ago')
    })

    test('format time over same hour', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(1641304920000));
        //xCurrent time is 14:02

        //time submitted is 14:01
        let wrapper = shallow(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"}hasUserVoted={true} timePosted={1641304860000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(wrapper.find('p').at(3).text()).toBe('Posted: 1 min. ago')
    })
    //react testing library tests
    test('has correct formatted time', () => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(1641304800000));
        render(<UserPost text={"Question"} answer={"Answer text"} submitter={"Caitlin"} votes={200} id={"1"} hasUserVoted={true} timePosted={1641304800000} incrementVote={() => {}} decrementVote={() => {}}/>)
        expect(screen.getByText('Posted: 0 sec. ago')).toBe(true)
    })
})