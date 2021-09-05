import React from 'react';
import Post from './Post'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputData: [],
            userId: "",
            voterData: [],
            sortLogic : {
                votes: "asc",
                timePosted: false
            }
        }
    }
    componentDidMount(){
        this.setState({
            inputData: this.props.getTableData(),
            voterData: this.props.voterData,
            userId: this.props.userId
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
        if ( !this.state.sortLogic[attribute] || this.state.sortLogic[attribute] === "desc") {
            this.sortAscending(attribute)
        }
        else if (this.state.sortLogic[attribute] === "asc") {
            this.sortDescending(attribute)
            
        }

    }

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

    decrementVote(postId){
        let inputData = this.state.inputData.map((post) => {
            if(post.id ===  postId){
                post.votes = post.votes - 1
            }
            return post
        })
        let voterData = this.state.voterData.map((post) => {
            var i = post.length
            while(i--){
                if(post[i]['id'] === postId){
                    post.splice(i, 1)
                }
            }  
            return post
        })

        this.setState({
            inputData: inputData,
            voterData: voterData
        })
    }

    hasUserVoted(postId){
        let result = false
        this.state.voterData.map((question)=> {
            if(eval(question.id) === Number(postId)){
                result = true
            }
        })
        return result
    }

    render(){

        return(
            <div className="container">
                <Button className="adminButton" onClick={() => {this.sortByAttribute('votes')}}> Sort By Votes</Button>
                <Button className="adminButton" onClick={() => {this.sortByAttribute('timePosted')}}> Sort By Date</Button>
                <div className="postContainer">
                    {this.state.inputData.map((item, index) => 
                    <Post votes={item.votes} poster={item.poster} text={item.text} id={item.id} key={item.id} incrementVote={this.incrementVote.bind(this)} decrementVote={this.decrementVote.bind(this)} hasUserVoted={this.hasUserVoted(item.id)} answer={item.answer}/>)}
                </div>
            </div>
        )
    }
}