import React from 'react';
import Post from './Post'
import Trending from './Trending'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
    },
    {
        id: 'oldy',
        name: 'Olody Poop',
      }
]

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputData: [],
            sortLogic : {
                votes: "asc",
                timePosted: false
            }
        }
    }
    componentDidMount(){
        this.setState({
            inputData: this.props.getTableData()
        }, () => {
            this.sortAscending("votes")
        })
    }

    updateSortLogic = (attribute, direction) => {
        let localSortLogic = {...this.state.sortLogic}
        Object.keys(localSortLogic).forEach(v => localSortLogic[v] = false)
        localSortLogic[attribute] = direction;
        return localSortLogic
    }
    sortAscending = (attribute) => {
        let data = [].concat(this.state.inputData).sort((a, b) => b[attribute] - a[attribute])
        this.setState({
            inputData: data,
            sortLogic: this.updateSortLogic(attribute, "asc")
        })
    }
    sortDescending = (attribute) => {
        let data = [].concat(this.state.inputData).sort((a, b) => a[attribute] - b[attribute])
        this.setState({
            inputData: data,
            sortLogic: this.updateSortLogic(attribute, "desc")
        })
    }

    sortByAttribute(attribute){
        if ( !this.state.sortLogic[attribute] || this.state.sortLogic[attribute] == "desc") {
            this.sortAscending(attribute)
        }
        else if (this.state.sortLogic[attribute] == "asc") {
            this.sortDescending(attribute)
            
        }

    }
    

    // updateVotes = (questionId, newVoteCount) => {
    //     let inputData = [].concat(this.state.inputData);
    //     inputData.map(function(question){
    //         if (question['questionId'] ==  questionId){
    //             question['votes'] = newVoteCount
    //         }
    //     console.log('new data')
    //     console.log(inputData)
    //     // this.setState({
    //     //     inputData: inputData
    //     // })
    //     })
    // }

    incrementVote(postId){
        let inputData = this.state.inputData.map((post) => {
            if(post.id ===  postId){
                post.votes = post.votes + 1
            }
            return post
        })
        this.setState({
            inputData: inputData
        })
    }

    render(){

        return(
            <div>
                <button onClick={() => {this.sortByAttribute('votes')}}> Sort Votes</button>
                <button onClick={() => {this.sortByAttribute('timePosted')}}> Sort By Date</button>
                {/* {this.state.inputData.map((item, index) => <Post votes={item.votes} poster={item.poster} text={item.text} id={item.id} key={item.id} incrementVote={this.incrementVote.bind(this)}/>)} */}
                {/* {this.state.inputData.map((item, index) => <Post votes={item.votes} questionId={item.questionId} key={item.id} updateVotes={this.updateVotes.bind(this)}/>)} */}
            </div>
        )
    }
}