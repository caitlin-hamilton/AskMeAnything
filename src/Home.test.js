import Home from './Home';
import {getTableData, getVoteData} from './api';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {shallow, mount} from 'enzyme';

Enzyme.configure({adapter: new Adapter()});
describe('PostTestComponent', () => {
    test('Render voted or not voted on click', () => {
        const tableData = [getTableData()[0]]
        const voterData = getVoteData("abcde")
        const wrapper = mount(<Home tableData={tableData} voterData={voterData} userId={"abcde"}></Home>)
        const votedButton = wrapper.find(FaThumbsUp);
        expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy()
        expect(wrapper.find('.voteP').text()).toBe("5")
        votedButton.at(0).simulate('click')
        const newNumOfVotes = wrapper.find('.voteP').text()
        expect(wrapper.find(FaRegThumbsUp).exists()).toBeTruthy()
        expect(newNumOfVotes).toBe("4")
        const unvotedButton = wrapper.find(FaRegThumbsUp);
        unvotedButton.at(0).simulate('click')
        const newNewNumOfVotes = wrapper.find('.voteP').text()
        expect(wrapper.find(FaThumbsUp).exists()).toBeTruthy()
        expect(newNewNumOfVotes).toBe("5")
    })
})