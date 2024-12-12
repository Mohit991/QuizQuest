import { useLocation } from 'react-router-dom';
const ScorePage = () => {
    const location = useLocation();
    const { score } = location.state || { score: 0 }; // Get score 

    return(
        <>
            <h1>Your Score: {score}</h1>
        </>
    )
}

export default ScorePage