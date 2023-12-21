import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container, FormControl, InputLabel, MenuItem } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));


// ------------------------DIALOG----------------------------------------------------------------
  
export interface iSimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleSetRecipients: (names: string[], num: number) => void;
  maxPeople: number;
  names: string[];
}

function SimpleDialog({ open, selectedValue, onClose, handleSetRecipients, maxPeople, names }: iSimpleDialogProps) {
    
    const numsArray: number[] = new Array(maxPeople)
      .fill(0)
      .map((num, i) => i + 1);

    const [num, setNum] = useState<number>(1)

  const handleClose = () => {
    onClose(selectedValue);
  };

    const handleClick = (value: string) => {
    handleSetRecipients(names, num)
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          color: "primary.dark",
        }}
      >
        Create Recipients List
      </DialogTitle>
      <Container>
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "primary.dark",
          }}
        >
          How many recipients should each person buy for?
        </Typography>
        <FormControl
          fullWidth
          sx={{
            fontSize: "1.2rem",
            color: "primary.dark",
            margin: '1rem 0'
          }}
        >
          <InputLabel id="recipients-select">Number of people</InputLabel>
          <Select
            labelId="recipients-select"
            id="demo-simple-select"
            value={num}
            label="People"
            onChange={(e) => {
              if (typeof e.target.value === "number") setNum(e.target.value);
            }}
          >
            {numsArray.map((num) => (
              <MenuItem
                key={num}
                value={num}
                sx={{
                  fontSize: "1.2rem",
                  color: "primary.dark",
                }}
              >
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => handleClick("close")}
          variant="contained"
          sx={{
            margin: "0.5rem 0",
          }}
        >
          Create Recipients List
        </Button>
      </Container>
    </Dialog>
  );
}

interface iRecipientsDialog {
  text: string;
  handleSetRecipients: (names: string[], num: number) => void;
  maxPeople: number;
    tooltip: boolean;
    names: string[];
}

// ------------------------COMPONENT----------------------------------------------------------------

export default function RecipientsDialog({text, handleSetRecipients, maxPeople, tooltip, names}: iRecipientsDialog) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
    if (tooltip) {
        return (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-45%, -50%)",
              minWidth: "16rem",
            }}
          >
            <HtmlTooltip
              title={
                <Fragment>
                  <Typography color="inherit">Caution!</Typography>
                  {"Recreating your recipient list cannot be undone."}
                </Fragment>
              }
            >
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: "info.dark",
                  color: "secondary.light",

                }}
              >
                {text}
              </Button>
            </HtmlTooltip>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              handleSetRecipients={handleSetRecipients}
              maxPeople={maxPeople}
              names={names}
            />
          </Box>
        );
    }
    else {
        return (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-45%, -50%)",
              minWidth: "16rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "secondary.light",
              }}
              onClick={handleClickOpen}
            >
              {text}
            </Button>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              handleSetRecipients={handleSetRecipients}
              maxPeople={maxPeople}
              names={names}
            />
          </Box>
        );
    }
}
