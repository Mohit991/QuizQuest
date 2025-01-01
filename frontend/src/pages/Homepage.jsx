import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const HomePage = () => {
  const { userName } = useContext(AppContext)
  const navigate = useNavigate();
  const startSelection = () => {
    navigate(`/quiz`);
  };

  return (
    <Box className="homepage-main">
      <Box className="header">
        <Box>
          <Typography className="homepage-maiin-heading">
            <span className="homepage-heading-letter">W</span>
            <span className="homepage-heading-letter">E</span>
            <span className="homepage-heading-letter">L</span>
            <span className="homepage-heading-letter">C</span>
            <span className="homepage-heading-letter">O</span>
            <span className="homepage-heading-letter">M</span>
            <span className="homepage-heading-letter">E</span>
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "whitesmoke" }} />

        <Box pt={3}>
          <Typography
            className="username"
            fontWeight={600}
            fontSize={"1.9rem"}
            sx={{
              letterSpacing: "3px",
              textShadow: "-0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)",
              padding: "20px",
              border: "1px solid white",
              borderRadius: "5px",
              WebkitMask: `
                  conic-gradient(at 50px 50px, #0000 75%, #000 0) 0 0/calc(100% - 50px) calc(100% - 50px),
                  linear-gradient(#000 0 0) content-box
                `,
            }}
          >
            {userName}
            <Box>
              <Typography sx={{fontSize:"10px"}}>
                <Link to="/user-progress">See Your Progress</Link>
              </Typography>
            </Box>
          </Typography>
        </Box>
        <Button
          className="start_btn_home"
          sx={{ marginTop: 10 }}
          onClick={startSelection}
        >
          START
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
