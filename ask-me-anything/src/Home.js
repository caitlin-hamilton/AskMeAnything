import React from 'react';
import Post from './Post'
import Trending from './Trending'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        if ( !this.state.sortLogic[attribute] || this.state.sortLogic[attribute] == "desc") {
            this.sortAscending(attribute)
        }
        else if (this.state.sortLogic[attribute] == "asc") {
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

    render(){

        return(
            <div>
                <button onClick={() => {this.sortByAttribute('votes')}}> Sort Votes</button>
                <button onClick={() => {this.sortByAttribute('timePosted')}}> Sort By Date</button>
                {/* < Trending /> */}

                {this.state.inputData.map((item, index) => <Post votes={item.votes} poster={item.poster} text={item.text} id={item.id} key={item.id} incrementVote={this.incrementVote.bind(this)}/>)}
            </div>
        )
    }
}