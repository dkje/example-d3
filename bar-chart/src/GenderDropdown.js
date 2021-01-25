import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const GenderDropdown = ({ genderSelected }) => {
  return (
    <>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please select gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => genderSelected("men")}>
          Men
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => genderSelected("women")}>
          Women
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

export default GenderDropdown;
