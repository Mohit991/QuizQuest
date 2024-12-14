import { Button } from "@mui/material"

const ErrorPage = () => {
    const onRetry = () => {
        
    }
    return (<>
        <h1>Oops! Something went wrong.</h1>
        <h1>Please try again.</h1>
        <Button onClick={onRetry}>
            Retry
        </Button>
    </>
    )
}

export default ErrorPage