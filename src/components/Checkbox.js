import * as React from "react";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { FormControl } from "@mui/material";

export default function CheckboxLabels(props) {
  const [checkedLabels, setCheckedState] = useState(["All", "All", "All"]);

  const handleClick = (event) => {
    var newCheck = [...checkedLabels];
    if (event.target.checked) {
      newCheck[parseInt(event.currentTarget.getAttribute("id"))] = event.target.value;
    } else {
      newCheck[parseInt(event.currentTarget.getAttribute("id"))] = "All";
    }

    setCheckedState(newCheck);
    props.updateFilters(newCheck);
  };

  // StackOverflow
  return (
    <FormControl>
      <FormLabel style={{ fontSize: "18px", lineHeight: "0.7" }} id="checkbox-group">
        {props.formName}
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          onClick={handleClick}
          id="0"
          control={<Checkbox />}
          value={props.value1}
          label={props.label1}
        />
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          onClick={handleClick}
          id="1"
          control={<Checkbox />}
          value={props.value2}
          label={props.label2}
        />
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          onClick={handleClick}
          id="2"
          control={<Checkbox />}
          value={props.value3}
          label={props.label3}
        />
      </FormGroup>
    </FormControl>
  );
}
