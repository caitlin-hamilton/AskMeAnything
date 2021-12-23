import Home from './Home';
import ThemeModal from './ThemeModal';
import {getTableData, getVoteData} from './api';
import { FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, {shallow, mount} from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

describe('ThemeModalTestComponent', () => {
    test('Render voted or not voted on click', () => {
    })
})