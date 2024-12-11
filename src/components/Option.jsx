import { Box } from "@mui/material"

const Option = ({ optionText, onOptionSelected, style }) => {
  return <Box sx={style} onClick={onOptionSelected}>optionText</Box>
};

export default Option;
