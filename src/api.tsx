import data from './input_data.json'
import userVoteData from './vote_data.json'

export const getTableData = () => {
    return data;
};

export const getVoteData = (userId: number) => {
    console.log(userVoteData)
    return userVoteData["100"]
    // for(let i =0; i< userVoteData.length -1; i ++){
    //     //if(userVoteData[i]["id"] == userId){
    //     if(100 === userId){
    //         return userVoteData[i]["votes"]
    //     }
    //     else {
    //         return [{id : 0}]
    //     }
    // }
};