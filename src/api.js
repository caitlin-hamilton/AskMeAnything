import data from './input_data.json'
import userVoteData from './vote_data.json'

export const getTableData = () => {
    return data;
};

export const getVoteData = (userId) => {
    for(let i =0; i< userVoteData.length -1; i ++){
        //if(userVoteData[i]["id"] == userId){
        if("abcde" === userId){
            return userVoteData[i]["votes"]
        }
    }
};