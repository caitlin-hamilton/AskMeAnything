
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import QuestionModal from './QuestionModal'
import Question from "../Question";
import * as api from "../api";

describe('Test Question Modal', () => {

    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(1641304800000)) //Current time is 14:00
    })

    test("Update question text", () =>{
        const stub = jest.fn()
        const mockApi = jest.spyOn(api, 'getUserName')

        const {getByPlaceholderText} = render(
            <QuestionModal 
                isModalOpen={true} 
                userId={"testId"}
                numberOfQuestions={2}
                addNewQuestion={stub}
                switchModal={jest.fn()}
            />
        )
        expect(screen.queryByDisplayValue('Test Question')).toBeNull()
        fireEvent.change(getByPlaceholderText("Ask us anything..."), {
            target: {value: "Test Question"}
        })
        expect(screen.getByDisplayValue('Test Question')).toBeTruthy()
        fireEvent.click(screen.getByTestId('submit'))

        const q: Question = {
                "id": "3",
                "text": "Test Question",
                "poster": "Anonymous",
                "votes": 0,
                "timePosted":1641304800000, //earliest
                "theme": "",
                "answer": ""
        }
        expect(stub).toBeCalledWith(q)
    })

    test("Update question text and user", () =>{
        const stub = jest.fn()
        const mockApi = jest.spyOn(api, 'getUserName')
        mockApi.mockReturnValue('User Name')
        const {getByPlaceholderText} = render(
            <QuestionModal 
                isModalOpen={true} 
                userId={"testId"}
                numberOfQuestions={2}
                addNewQuestion={stub}
                switchModal={jest.fn()}
            />
        )
        expect(screen.queryByDisplayValue('Test Question')).toBeNull()
        userEvent.click(screen.getByTestId('checkbox'))
        fireEvent.change(getByPlaceholderText("Ask us anything..."), {
            target: {value: "Test Question"}
        })
        fireEvent.click(screen.getByTestId('submit'))

        const q: Question = {
                "id": "3",
                "text": "Test Question",
                "poster": "User Name",
                "votes": 0,
                "timePosted":1641304800000, //earliest
                "theme": "",
                "answer": ""
        }
        expect(stub).toBeCalledWith(q)
    })

})

export {}