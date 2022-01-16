
import sortArrayQuestion from '../utils/sortArrayQuestion'
import Question from "../Question";

describe("Sort list of questions by attributes and order", () => {
    let testData: Question[]
    let result: Question[]

    beforeAll(() =>{
        testData  = [
            {
                "id": "1",
                "text": "",
                "poster": "TestUser",
                "votes": 5,
                "timePosted": 1641303825000, //latest
                "theme": "",
                "answer": ""
            },
            {
                "id": "2",
                "text": "",
                "poster": "TestUser",
                "votes": 15,
                "timePosted": 1641135297000,
                "theme": "",
                "answer": ""
            },
            {
                "id": "3",
                "text": "",
                "poster": "TestUser",
                "votes": 10,
                "timePosted":1641225006000, //earliest
                "theme": "",
                "answer": ""
            },
        ]
    })

    test('sort ascending votes', () => {
        result = sortArrayQuestion(testData, 'asc', "votes")
        expect(result.map(item => item.id)).toStrictEqual(["1", "3", "2"])
    })
    test('sort descending votes', () => {
        result = sortArrayQuestion(testData, 'desc', "votes")
        expect(result.map(item => item.id)).toStrictEqual(["2", "3", "1"])
    })

    test('sort ascending timePosted', () => {
        result = sortArrayQuestion(testData, 'asc', "timePosted")
        expect(result.map(item => item.id)).toStrictEqual(["2", "3", "1"])
    })
    test('sort descending timePosted', () => {
        result = sortArrayQuestion(testData, 'desc', "timePosted")
        expect(result.map(item => item.id)).toStrictEqual(["1", "3", "2"])
    })

})

export {}