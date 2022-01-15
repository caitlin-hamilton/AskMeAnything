import styled from 'styled-components'

export const QuestionHeading = styled.h1`
width: 50%;
height: 100%;
display: flex;
`

export const QuestionContainer = styled.div`
width: 50%;
height: 100%;
display: flex;
`

export const AnswerContainer = styled.div`
flex-direction: row;
flex: 50%;
width: 100%;
align-self: flex-end;
`

export const AdminPostContainer = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    width: 100%;
    margin-bottom: 10px;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    background: lightgray;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    display: flex;
    flex-wrap: wrap;
    overflow: visible;
`

export const TextContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
`

export const ButtonContainerDelete = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`