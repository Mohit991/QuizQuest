import { Box, Typography } from "@mui/material"

const Question = ({questionText}) => {
    return (
        <Box className="questionBox">
            <Typography className="text" variant="h4" mb={4}>{questionText}</Typography>
        </Box>
    )
}

export default Question