import CircularProgress from '@mui/material/CircularProgress';

function CustomSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'inherit' }}>
      <CircularProgress size={60} thickness={4} color="secondary" />
    </div>
  );
}

export default CustomSpinner;