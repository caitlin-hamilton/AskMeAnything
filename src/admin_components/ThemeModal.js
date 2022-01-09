import React, { useState } from "react";
import themes from "./Themes";
import { Modal } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

export default function ThemeModal(props) {
  const [theme, updateTheme] = useState("");
  function updateThemeForm(event) {
    updateTheme(event.target.value);
  }

  function submit(event) {
    props.switchModal();
    event.preventDefault();
    props.themes.push(theme);
    props.showSuccessfulToast();
  }

  function deleteTheme(e) {
    const index = themes.indexOf(e.target.value);
    if (index > -1) {
      themes.splice(index, 1);
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
          />
          <input type="submit" value="Submit" />
        </form>
        <div style={{ height: "25px" }}></div>
        <div className="buttonContainerDelete">
          {themes.map((item) => (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              value={item}
              onClick={(e) => deleteTheme(e, "value")}
            >
              {item}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
