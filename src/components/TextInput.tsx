import { useState, useEffect } from "react";

import { InputLabel, Input, Typography } from "@mui/material"

interface iInputLabel {
  labelText: string;
  id: string;
  onChange: (val: string) => void;
  aria: string;
  labelColor: number;
  inputColor: number;
  type: string;
  minLength?: number;
  maxLength?: number;
  checkLength?: boolean;
  reset?: boolean;
}


const TextInput = ({
  labelText,
  id,
  onChange,
  aria,
  labelColor,
  inputColor,
  type = "text",
  minLength = 0,
  maxLength = 100,
  checkLength = false,
  reset = false,
}: iInputLabel) => {
  const colorStyles = [
    { color: "primary.main" },
    { color: "primary.dark" },
    { color: "info.main" },
    { color: "info.dark" },
  ];

  const [formVal, setFormVal] = useState('');
  const [err, setErr] = useState("");
  const [hasChecked, setHasChecked] = useState(false);

  const handleChange = (val: string) => {
    if (val.length >= minLength && !hasChecked) {
      setHasChecked(true);
    }
    if (hasChecked) {
      setErr("");
      let error = "";
      if ((val.length > maxLength || val.length < minLength) && checkLength) {
        error = `Must be between ${minLength} and ${maxLength} characters.`;
      } else if (val.match(/[<>&"';*]/g)) {
        error = "Invalid characters.";
      } else if (val === "") {
        setErr("Value required");
      }
      setErr(error);
      // if no errors, set the value in the form to the value in this input
      if (error === "" && val) {
        onChange(val);
      }
      // if errors, set the value in the form to nothing, which will disable form submission
      else {
        onChange("");
      }
    }
  };

  useEffect(() => {
    handleChange(formVal);
  }, [hasChecked, formVal]);
    
    useEffect(() => {
        setFormVal('')
    }, [reset])

  return (
    <>
      <InputLabel htmlFor={id} sx={colorStyles[labelColor]}>
        {labelText}
      </InputLabel>
      <Input
        type={type}
        id={id}
        aria-describedby={aria}
        value={formVal}
        onChange={(e) => {
          setFormVal(e.target.value);
        }}
        onBlur={() => {
          setHasChecked(true);
        }}
        sx={{
          width: "12rem",
          fontSize: "1.2rem",
          color: colorStyles[inputColor].color,
        }}
      />
      {err && (
        <Typography
          sx={{
            color: "info.main",
            fontSize: "1rem",
            width: "12rem",
          }}
        >
          {err}
        </Typography>
      )}
    </>
  );
};

export default TextInput
