import data from "./data/input_data.json";
import userVoteData from "./data/vote_data.json";
import userMapping from "./data/users.json";
import Question from "./Question";

interface VoterData {
  [key: string]: Array<string>;
}

interface UserMapping {
  [key: string]: string;
}

export const getQuestionData = () => {
  const questions: Array<Question> = [];
  for (let i = 0; i < data.length - 1; i++) {
    questions.push(data[i]);
  }
  return questions;
};

export const getVoteData = (userId: string) => {
  let votes: Array<string> = [];
  const voterData: VoterData = userVoteData;
  if (Object.keys(userVoteData).includes(userId.toString())) {
    const key: keyof VoterData = userId.toString();
    votes = voterData[key];
  }
  return votes;
};

export const getUserName = (userId: string) => {
  let name: string = "";
  const userMappingData: UserMapping = userMapping;
  try {
    if (Object.keys(userMapping).includes(userId.toString())) {
      name = userMappingData[userId];
    } else {
      throw "Unknown user";
    }
  } catch (err) {
    console.log(err);
  }
  return name;
};
