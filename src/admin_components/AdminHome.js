import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AdminPost from "./AdminPost";
import Button from "@material-ui/core/Button";
import ThemeModal from "./ThemeModal";
import themes from "./Themes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {QuestionHeading, QuestionContainer} from './AdminComponents.styled'
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import '../App.css'

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

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "darkgrey",
  padding: 8,
  width: "100%",
  height: "100%",
});

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      meetingOrder: [],
      themes: [],
      isModalOpen: false,
      sortLogic: {
          votes: false,
          timePosted: false,
      },
    };
  }
  componentDidMount() {
    this.setState({
      submissions: this.props.getTableData(),
      themes: themes,
    });
  }

  switchModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  id2List = {
    submissions: "submissions",
    meetingOrder: "meetingOrder",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
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

      if (source.droppableId === "meetingOrder") {
        this.setState({
          selected: items,
        });
      } else if (source.droppableId === "submissions") {
        this.setState({
          submissions: items,
        });
      }
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        submissions: result.submissions,
        meetingOrder: result.meetingOrder,
      });
    }
  };

  updateSortLogic = (attribute, direction) => {
    let localSortLogic = { ...this.state.sortLogic };
    Object.keys(localSortLogic).forEach(
      (v) => (localSortLogic[v] = false)
    );
    localSortLogic[attribute] = direction;
    return localSortLogic;
  };

  sortAscending = (attribute) => {
    let data = []
      .concat(this.state.submissions)
      .sort((a, b) => b[attribute] - a[attribute]);
    this.setState({
      submissions: data,
      sortLogic: this.updateSortLogic(attribute, "asc"),
    });
  };
  sortDescending = (attribute) => {
    let data = []
      .concat(this.state.submissions)
      .sort((a, b) => a[attribute] - b[attribute]);
    this.setState({
      submissions: data,
      sortLogic: this.updateSortLogic(attribute, "desc"),
    });
  };

  sortByAttribute(attribute) {
    if (
      !this.state.sortLogic[attribute] ||
      this.state.sortLogic[attribute] === "desc"
    ) {
      this.sortAscending(attribute);
    } else if (this.state.sortLogic[attribute] === "asc") {
      this.sortDescending( attribute);
    }
  }

  updatePost = (questionList, attribute, newTheme, questionId) => {
    let data = [...this.state[questionList]];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (questionId === item["id"]) {
        item[attribute] = newTheme;
        data[i] = item;
        this.setState({
          [questionList]: data,
        });
      }
    }
  };


  showNewThemeToast() {
    toast.success("New Theme Added", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    toast();
  }

  showSuccessfulDeleteToast() {
    toast.error("Theme Deleted", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    toast();
  }  

  renderArrowDirection(attribute){
    if(this.state.sortLogic[attribute] === 'asc'){
      return(<AiOutlineArrowDown />)
    }
    else if(this.state.sortLogic[attribute] === 'desc') {
      return(<AiOutlineArrowUp />)
    }
    else {
      return
    }
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <div style={{display: 'flex', width:'100%'}}>
          <QuestionHeading>Submissions</QuestionHeading>
          <QuestionHeading>Meeting Order</QuestionHeading>
        </div>
        <div style={{flexWrap: 'wrap', marginRight:'auto'}}>
          <Button
            className="adminButton"
            onClick={() => {
              this.sortByAttribute("votes");
            }}
          >
            Popular
            {this.renderArrowDirection('votes')}
          </Button>
          <Button
            className="adminButton"
            onClick={() => {
              this.sortByAttribute("timePosted");
            }}
          >
            Most Recent 
            {this.renderArrowDirection('timePosted')}
          </Button>
          <Button className="adminButton" onClick={() => this.switchModal()}>
            Edit Themes
          </Button>
          <ThemeModal
            isModalOpen={this.state.isModalOpen}
            switchModal={() => this.switchModal()}
            themes={themes}
            showNewThemeToast={() => this.showNewThemeToast()}
            showSuccessfulDeleteToast={() => this.showSuccessfulDeleteToast()}
          />
          <Button className="adminButton float-right">Save Order</Button>
          <Button className="adminButton float-right">Start Meeting</Button>
        </div>
          <div style={{display: 'flex', width: '100%'}}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <QuestionContainer>
                <Droppable droppableId="submissions">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.submissions.map((item, index) => (
                        <AdminPost
                          provided={provided}
                          snapshot={snapshot}
                          text={item.text}
                          key={item.id}
                          dragId={item.id}
                          index={index}
                          timePosted={item.timePosted}
                          votes={item.votes}
                          theme={item.theme}
                          questionList={"questions"}
                          updatePost={this.updatePost}
                          answer={item.answer}
                          poster={item.poster}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </QuestionContainer>
              <QuestionContainer>
                <Droppable droppableId="meetingOrder">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.meetingOrder.map((item, index) => (
                        <AdminPost
                          provided={provided}
                          snapshot={snapshot}
                          text={item.text}
                          key={item.id}
                          dragId={item.id}
                          index={index}
                          timePosted={item.timePosted}
                          votes={item.votes}
                          theme={item.theme}
                          questionList={"selected"}
                          updatePost={this.updatePost}
                          answer={item.answer}
                          poster={item.poster}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </QuestionContainer>
            </DragDropContext>
          </div>
      </div>
    );
  }
}
