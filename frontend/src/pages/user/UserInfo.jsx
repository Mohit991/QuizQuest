import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextField, Button, Typography, Grid, IconButton, Paper, Box, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import { getUserInfo, updateUser } from '../../services/apiService';
import { AppContext } from '../../context/AppContext';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { userId, token } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        gender: '',
        email: ''
    });
    const [editableField, setEditableField] = useState(null);
    const [tempUserInfo, setTempUserInfo] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const inputRefs = {
        name: useRef(null),
        age: useRef(null),
        gender: useRef(null),
        email: useRef(null)
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo(userId, token);
                setUserInfo({
                    ...data,
                    gender: data.gender ? data.gender.toLowerCase() : null, // Ensure gender is in lowercase or set to null
                    age: data.age ?? null // Set age to null if not present
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [userId, token]);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        navigate('/'); // Navigate to home
        window.location.reload(); // Refresh the page to load updated info
    };


    const handleEditClick = (field) => {
        if (editableField === field) {
            return;
        }
        setEditableField(field);
        setTempUserInfo({ ...userInfo });
        inputRefs[field].current.focus();
    };

    const handleCancel = () => {
        setUserInfo({ ...tempUserInfo });
        setEditableField(null);
        setError("");
    };

    const handleSave = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const updatedData = { ...userInfo };
            const response = await updateUser(userId, updatedData, token);

            setUserInfo(response);
            setEditableField(null);
            setError("");

            // Open the success dialog
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error updating user info:', error);
            setError(error.message || 'Failed to update user information.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const validateForm = () => {
        const { name, age, gender, email } = userInfo;

        if (!name || !age || !gender || !email) {
            return "All fields are required.";
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            return "Name should only contain alphabetic characters.";
        }

        if (name.length < 2 || name.length > 50) {
            return "Name must be between 2 and 50 characters.";
        }

        const ageNumber = parseInt(age, 10);
        if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 80) {
            return "Age must be a number between 1 and 80.";
        }

        const standardizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        if (!["Male", "Female", "Other"].includes(standardizedGender)) {
            return "Gender must be 'Male', 'Female', or 'Other'.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address.";
        }

        return null;
    };

    return (
        <Box sx={{
            minHeight: "86vh",
            backgroundColor: "#393939",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 4
        }}>
            <Paper elevation={3} sx={{
                maxWidth: "600px",
                width: "100%",
                p: 4,
                backgroundColor: "#242424",
                color: "#ffa116",
                borderRadius: "16px",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center', color: '#ffa116' }}>
                        User Information
                    </Typography>
                    <form>
                        <Grid container spacing={3}>
                            {/* Name Field */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: '#ffa116' } }}
                                    InputProps={{
                                        readOnly: editableField !== "name",
                                        style: { color: 'white' },
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => handleEditClick("name")}
                                                sx={{ color: '#ffa116' }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        )
                                    }}
                                    inputRef={inputRefs.name}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffa116',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Age Field */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    value={userInfo.age}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: '#ffa116' } }}
                                    InputProps={{
                                        readOnly: editableField !== "age",
                                        style: { color: 'white' },
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => handleEditClick("age")}
                                                sx={{ color: '#ffa116' }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        )
                                    }}
                                    inputRef={inputRefs.age}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffa116',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Gender Field */}
                            <Grid item xs={12}>
                                <FormControl
                                    className='gender-field-userinfo'
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        textAlign: "left",
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffa116',
                                                color: 'white'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ffa116',
                                                color: 'white'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ffa116',
                                                color: 'white'
                                            },
                                        },
                                    }}
                                >
                                    <InputLabel
                                        sx={{
                                            color: '#ffa116',
                                            '&.Mui-focused': {
                                                color: '#ffa116',
                                            },
                                            '&:hover': {
                                                color: '#ffa116',
                                            },
                                        }}
                                    >
                                        Gender
                                    </InputLabel>
                                    <Select
                                        className='gender-field-userinfo'
                                        onClick={() => handleEditClick("gender")}
                                        label="Gender"
                                        name="gender"
                                        value={userInfo.gender}
                                        onChange={handleChange}
                                        inputRef={inputRefs.gender}
                                        disabled={editableField !== "gender"}
                                        sx={{
                                            '& .MuiSelect-select': {
                                                color: 'white',
                                            },
                                            '&.Mui-disabled .MuiSelect-select': {
                                                color: 'white',
                                            },
                                            backgroundColor: 'transparent',
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#242424',
                                                    color: 'white',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>

                            {/* Email Field */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: '#ffa116' } }}
                                    InputProps={{
                                        readOnly: editableField !== "email",
                                        style: { color: 'white' },
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => handleEditClick("email")}
                                                sx={{ color: '#ffa116' }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        )
                                    }}
                                    inputRef={inputRefs.email}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ffa116',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff8c00',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Save/Cancel Buttons */}
                            {editableField && (
                                <Grid item xs={12}>
                                    <Button
                                        onClick={handleSave}
                                        variant="contained"
                                        sx={{
                                            mr: 2,
                                            backgroundColor: "#ffa116",
                                            color: "#242424",
                                            '&:hover': {
                                                backgroundColor: "#ff8c00",
                                            },
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        variant="outlined"
                                        sx={{
                                            color: "#ffa116",
                                            borderColor: "#ffa116",
                                            '&:hover': {
                                                borderColor: "#ff8c00",
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            )}

                            {/* Error Message */}
                            {error && (
                                <Grid item xs={12}>
                                    <Typography style={{ color: '#ff6347' }}>
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </motion.div>
            </Paper>
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="success-dialog-title"
                aria-describedby="success-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: '#282828',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <DialogTitle id="success-dialog-title" sx={{ color: '#ffa116' }}>
                    Update Successful
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="success-dialog-description" sx={{ color: '#eff1f6bf' }}>
                        Your information has been updated successfully!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDialogClose}
                        sx={{
                            color: '#eff1f6bf',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default UserInfo;
