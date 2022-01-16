import Question from "../Question";

export default function sortArrayQuestion(data:Array<Question>, direction: boolean | string, attribute: keyof Question){
    if (direction === "asc") {
        data.sort((a, b) => {
          if (a[attribute] >= b[attribute]) {
            return 1;
          } else if (a[attribute] < b[attribute]) {
            return -1;
          } else {
            return 0;
          }
        });
      } else {
        data.sort((a, b) => {
          if (a[attribute] < b[attribute]) {
            return 1;
          } else if (a[attribute] >= b[attribute]) {
            return -1;
          }
          else {
            return 0;
          }
        });
    }
    return data

}