interface Question {
    text: string;
    id: number;
    poster: string;
    votes: number
    timePosted: number;
    theme: string;
    answer: string
}

export default Question