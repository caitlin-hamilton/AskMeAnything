import data from './data/input_data.json'
import userVoteData from './data/vote_data.json'
import Question from './Question'

interface VoterData {
    [key: string]: Array<string>;
}
const voterData: VoterData = userVoteData


export const getQuestionData = () => {
    const questions: Array<Question> = []
    for(let i = 0; i< data.length -1; i ++){
        questions.push(data[i])
    }
    return questions
};

export const getVoteData = (userId: string) => {
    let votes: Array<string> = []
    if(Object.keys(userVoteData).includes(userId.toString())){
        const key: keyof VoterData = userId.toString()
        votes = voterData[key]
    }
    return votes
};