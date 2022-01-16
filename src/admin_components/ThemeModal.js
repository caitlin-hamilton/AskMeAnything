import React, { useState } from "react";
import themes from "./Themes";
import { Modal } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import {ButtonContainerDelete} from './AdminComponents.styled'

export default function ThemeModal(props) {
  const [theme, updateTheme] = useState("");
  function updateThemeForm(event) {
    updateTheme(event.target.value);
  }

  function submit(event) {
    props.themes.push(theme);
    props.switchModal();
    event.preventDefault();
    props.showNewThemeToast();
  }

  function deleteTheme(themeName) {
    const index = themes.indexOf(themeName);
    if (index > -1) {
      themes.splice(index, 1);
      props.switchModal();
      props.showSuccessfulDeleteToast()
    }
  }

  return (
    <Modal show={props.isModalOpen} onHide={props.switchModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Themes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <input
            onChange={updateThemeForm}
            placeholder="Add new theme"
            maxLength={12} 
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <div style={{ height: "25px" }}></div>
        <ButtonContainerDelete>
          {themes.map((item) => (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              value={item}
              onClick={() => deleteTheme(item)}
            >
              {item}
            </Button>
          ))}
        </ButtonContainerDelete>
      </Modal.Body>
    </Modal>
  );
}
