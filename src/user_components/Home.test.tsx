import Home from './Home';
import {getTableData, getVoteData} from '../api';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {shallow, mount} from 'enzyme';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Question from '../Question'

function getTestData(){
    let data = getTableData()
    return [data[0]]
}

//enzyme tests
Enzyme.configure({adapter: new Adapter()});

describe('HomeTestComponent', () => {
    test('Render voted or not voted on click', () => {
        const wrapper = mount(<Home getQuestions={getTestData} getUserData={getVoteData} userId={100}></Home>)
        const votedButton = wrapper.find(FaThumbsUp);

        expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy()
        expect(wrapper.find('.voteP').text()).toBe("5")

        votedButton.at(0).simulate('click')
        let newNumOfVotes = wrapper.find('.voteP').text()

        expect(wrapper.find(FaRegThumbsUp).exists()).toBeTruthy()
        expect(newNumOfVotes).toBe("4")

        wrapper.find(FaRegThumbsUp).at(0).simulate('click')
        newNumOfVotes = wrapper.find('.voteP').text()

        expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy()
        expect(newNumOfVotes).toBe("5")
    })
})

//react testing library

describe('HomeTestComponentReactTestingLibrary', () => {
    test('User has already voted so decrement', () => {
        render(<Home getQuestions={getTableData} getUserData={getVoteData} userId={100}></Home>)
        userEvent.click(screen.getByText('5'))
        expect(screen.getByText('4'))
    })
    // test('User has not already voted so increment', () => {
    //     render(<Home questions={tableData} userData={[]} userId={100}></Home>)
    //     userEvent.click(screen.getByText(5))
    //     expect(screen.getByText('6')).toBeChecked()
    // })
})