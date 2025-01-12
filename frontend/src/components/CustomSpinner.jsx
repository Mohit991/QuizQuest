import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';

function CustomSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#393939',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <CircularProgress
            size={80}
            thickness={4}
            sx={{
              color: '#ffa116',
              '& .MuiCircularProgress-svg': {
                strokeLinecap: 'round',
              },
            }}
          />
        </motion.div>
      </motion.div>
    </Box>
  );
}

export default CustomSpinner;

