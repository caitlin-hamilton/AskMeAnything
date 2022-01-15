import styled from 'styled-components'

export const PostDiv = styled.div`
padding-top: 50px;
  display: inline-block;
  padding-bottom: 50px;
  width: 100%;
  text-align: left;
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
  font-size: 120%;
  display: flex;
`

export const PostTopDiv =  styled.div`
width: 100%;
font-size: 120%;
display: flex;
`

export const PostQuestionPara = styled.p`
width: 90%;
font-size: 120%;
`

export const LikeContainer = styled.p` 
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  border-radius: 10px/20px;
  height: max-content;
  width: 10%;
`

export const AnswerDiv = styled.p `
  flex-direction: row;
  width: 100%;
  align-self: flex-end;
`

export const UserPostContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 15px;
  align-self: center;
  background: darkgray;
`

export const Container = styled.div`
  width: 100%;
  height: 10%;
`