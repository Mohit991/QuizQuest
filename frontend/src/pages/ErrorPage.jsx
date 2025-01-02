import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();

    const onRetry = () => {
        navigate("/")
    }
    return (
    <>
        <h1>Oops! Something went wrong.</h1>
        <h1>Please try again.</h1>
        <Button onClick={onRetry}>
            Retry
        </Button>
    </>
    )
}

export default ErrorPage