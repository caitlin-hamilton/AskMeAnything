import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import themes from "./Themes";
import Button from "@material-ui/core/Button";
import AdminQuestionModal from "./AdminQuestionModal";
import { MdAddCircleOutline } from "react-icons/md";
import formatTime from "../utils/formatTime";
import {AnswerContainer, AdminPostContainer, TextContainer} from './AdminComponents.styled'

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "lightgrey",
  ...draggableStyle,
});

export default class AdminPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "Select Theme",
      isModalOpen: false,
      answer: "",
      showAnswer: false,
    };
    this.updateTheme = this.updateTheme.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentDidMount() {
    this.setState({
      theme: this.props.theme ? this.props.theme : "Select Theme",
      answer: this.props.answer,
    });
  }

  updateTheme(evt) {
    this.setState({
      theme: evt,
    });

    this.props.updatePost(this.props.questionList, 'theme', evt, this.props.dragId);
  }

  switchModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  switchShowAnswer() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

renderReply() {
  if (this.state.answer) {
    return (
      <AnswerContainer>
        <Button onClick={() => this.switchShowAnswer()}>
          {this.state.showAnswer ? (
              <p>Hide Answer</p>
          ) : (
              <p>Show Answer</p>
          )}
        </Button>
        {this.state.showAnswer ? <p>{this.state.answer}</p> : ""}
      </AnswerContainer>
    );
  }
}


  addAnswer(answer) {
    this.setState({
      answer: answer,
    });
    this.props.updatePost(this.props.questionList, 'answer', answer, this.props.dragId);
  }

  render() {
    return (
      <Draggable
        key={this.props.dragId}
        draggableId={this.props.dragId}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <AdminPostContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <p style={{flex: '80%'}}>{this.props.text}</p>
            <Button className="editButton" onClick={() => this.switchModal()}>
              {<MdAddCircleOutline size={30} />}
            </Button>
            <AdminQuestionModal
              isModalOpen={this.state.isModalOpen}
              addAnswer={this.addAnswer}
              answer={this.state.answer}
              switchModal={() => this.switchModal()}
            />
            <TextContainer>
              <h5 style={{flexGrow:2}}>Votes: {this.props.votes} </h5>
              <h5 style={{flexGrow:2}}>Asked By: {this.props.poster}</h5>
              <h5 style={{flexGrow:2}}>
                Posted: {formatTime(this.props.timePosted)}
              </h5>
              <Dropdown
                onSelect={this.updateTheme}
                title={<span>Dropdown</span>}
                className="dropdown"
              >
                <Dropdown.Toggle className="dropdown">
                  {this.state.theme}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown">
                  {themes.map((item) => (
                    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </TextContainer>
            {this.renderReply()}
          </AdminPostContainer>
        )}
      </Draggable>
    );
  }
}
