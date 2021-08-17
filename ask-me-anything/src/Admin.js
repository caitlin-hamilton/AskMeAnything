import React, { Component, useState } from 'react';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import AdminQuestion from './AdminQuestion';
import Button from '@material-ui/core/Button';
import ThemeModal from './ThemeModal';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'darkgrey',
    padding: grid,
    width: "100%",
    height:"100%"
});

export default class AdminBoard extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputData: [],
            selected: [],
            isModalOpen: false,
            sortLogic : {
                "inputData" : {
                    votes: "asc",
                    timePosted: false
                },
                "selected" : {
                    votes: "asc",
                    timePosted: false
                }
            }
        }
    }
    componentDidMount(){
        this.setState({
            inputData: this.props.getTableData()
        })
    }

    switchModal() {
        this.setState({
            isModalOpen: ! this.state.isModalOpen
        })
    }

    id2List = {
        droppable: 'inputData',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
                this.setState({
                    selected:items
                })
            }
            else if (source.droppableId == "droppable"){
                state = {inputData: items}
                this.setState({
                    inputData:items
                })
            }
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                inputData: result.droppable,
                selected: result.droppable2
            });
        }
    };

    updateSortLogic = (questionList, attribute, direction) => {
        let localSortLogic = {...this.state.sortLogic}
        Object.keys(localSortLogic[questionList]).forEach(v => localSortLogic[questionList][v] = false)
        localSortLogic[questionList][attribute] = direction;
        return localSortLogic
    }
    sortAscending = (questionList, attribute) => {
        let data = [].concat(this.state[questionList]).sort((a, b) => b[attribute] - a[attribute])
        this.setState({
            [questionList]: data,
            sortLogic: this.updateSortLogic(questionList, attribute, "asc")
        })
    }
    sortDescending = (questionList, attribute) => {
        let data = [].concat(this.state[questionList]).sort((a, b) => a[attribute] - b[attribute])
        this.setState({
            [questionList]: data,
            sortLogic: this.updateSortLogic(questionList, attribute, "desc")
        })
    }

    sortByAttribute(questionList, attribute){
        if ( !this.state.sortLogic[questionList][attribute] || this.state.sortLogic[questionList][attribute] == "desc") {
            this.sortAscending(questionList,attribute)
        }
        else if (this.state.sortLogic[questionList][attribute] == "asc") {
            this.sortDescending(questionList, attribute)
            
        }

    }

    updateThemeForInput(questionList, newTheme, questionId){
        let data = [...this.state[questionList]]
        for(let i=0; i< data.length; i ++){
            let item = data[i]
            if(questionId == item["id"]){
                item["theme"] = newTheme
                data[i] = item
                this.setState({
                    [questionList]: data
                })
            }
        }
    }

    updateTheme = (newTheme, questionId) => {
        this.updateThemeForInput('inputData', newTheme, questionId)
        this.updateThemeForInput('selected', newTheme, questionId)
    }

    render() {
        return (
            <div>
                <div className="questionList">
                    <h1 className="one">All Questions</h1>
                    <h1 className="two">Sorted Questions</h1>
                </div>
                <div className="buttonContainer">
                        <Button className="adminButton" onClick={() => {this.sortByAttribute('inputData', 'votes')}}>Sort By Votes</Button>
                        <Button className="adminButton" onClick={() => {this.sortByAttribute('inputData', 'timePosted')}}>Sort By Date</Button>
                        <Button className="adminButton" onClick={() => this.switchModal()}>Edit Themes</Button>
                        <ThemeModal isModalOpen={this.state.isModalOpen} switchModal={() => this.switchModal()}/>
                        <Button className="adminButton">Save Order</Button>
                    </div>
                <div>
                    <div className="questionList">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <div className="one">
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.inputData.map((item, index) => (
                                            <AdminQuestion  provided={provided} snapshot = {snapshot} text={item.text} key={item.id} dragId={item.id} index={index} timePosted={item.timePosted} votes={item.votes} theme={item.theme} updateTheme={this.updateTheme}/>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            </div>
                            <div className="two">
                            <Droppable droppableId="droppable2">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.selected.map((item, index) => (
                                            <AdminQuestion  provided={provided} snapshot = {snapshot} text={item.text} key={item.id} dragId={item.id} index={index} timePosted={item.timePosted} votes={item.votes} theme={item.theme} updateTheme={this.updateTheme}/>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        );
    }
}
