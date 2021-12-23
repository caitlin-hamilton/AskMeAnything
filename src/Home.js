import React from 'react';
import Post from './Post'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import QuestionModal from './QuestionSubmit';

export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            inputData: [],
            userId: "",
            voterData: [],
            isModalOpen: false,
            sortLogic : {
                votes: "asc",
                timePosted: false
            }
        }
    }
    componentDidMount(){
        this.setState({
            inputData: this.props.tableData,
            voterData: this.props.voterData,
            userId: this.props.userId
        }, () => {
            this.sortAscending("timePosted")
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
        let voterData = [].concat(this.state.voterData)
        voterData.push({
            id: postId
        })

        this.setState({
            inputData: inputData,
            voterData: voterData
        })
    }

    decrementVote(postId){
        let inputData = this.state.inputData.map((post) => {
            if(post.id ===  postId){
                post.votes = post.votes - 1
            }
            return post
        })

        let voterData = this.state.voterData.filter((element) => {
            return element["id"] != postId
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

    switchModal() {
        this.setState({
            isModalOpen: ! this.state.isModalOpen
        })
    }

    render(){

        return(
            <div className="container">
                <div className="submitQuestionContainer">
                    <textarea onClick={() => this.switchModal()} placeholder='Ask us anything...' className="submitQuestionText"/>
                    <QuestionModal isModalOpen={this.state.isModalOpen} switchModal={() => this.switchModal()} data={this.state.inputData}/>
                </div>
                <Button className="adminButton" onClick={() => {this.sortByAttribute('votes')}}>Popular</Button>
                <Button className="adminButton" onClick={() => {this.sortByAttribute('timePosted')}}>Most Recent</Button>
                <div className="postContainer">
                    {this.state.inputData.map((item, index) => 
                    <Post votes={item.votes} poster={item.poster} text={item.text} id={item.id} key={item.id} timePosted={item.timePosted} incrementVote={this.incrementVote.bind(this)} decrementVote={this.decrementVote.bind(this)} hasUserVoted={this.hasUserVoted(item.id)} answer={item.answer}/>)}
                </div>
            </div>
        )
    }
}