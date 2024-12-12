import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
const ScorePage = () => {
    const location = useLocation();
    const { score } = location.state || { score: 0 }; // Get score 

    const onQuizTryAgain = () => {
        
    }
    return(
        <>
            <h1>Your Score: {score}</h1>
            <Button onClick={onQuizTryAgain}>Try Again</Button>
        </>
    )
}

export default ScorePage