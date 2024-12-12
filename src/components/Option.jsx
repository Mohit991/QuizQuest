import { Box } from "@mui/material"

const Option = ({ optionText, onOptionSelected, style }) => {
  return <Box className="option" sx={style} onClick={onOptionSelected}>{optionText}</Box>
};

export default Option;
