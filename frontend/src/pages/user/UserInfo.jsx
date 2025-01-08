import React, { useState, useEffect, useContext, useRef } from 'react';
import { TextField, Button, Container, Typography, Grid, IconButton, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getUserInfo } from '../../services/apiService'; // Adjust the import path as necessary
import { AppContext } from '../../context/AppContext';

const UserInfo = () => {
    const { userId, token } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        gender: '',
        email: ''
    });
    const [editableField, setEditableField] = useState(null); // Track the field being edited
    const [tempUserInfo, setTempUserInfo] = useState({}); // Temporary state for changes
    const [error, setError] = useState("");

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
                    gender: data.gender.toLowerCase() // Ensure gender is in lowercase
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [userId, token]);

    const handleEditClick = (field) => {
        if (editableField === field) {
            return; // Ignore if already editing the same field
        }
        setEditableField(field);
        setTempUserInfo({ ...userInfo }); // Preserve the current state
        inputRefs[field].current.focus(); // Focus the input field
    };

    const handleCancel = () => {
        setUserInfo({ ...tempUserInfo }); // Revert changes
        setEditableField(null); // Close edit mode
        setError(""); // Clear any errors
    };

    const handleSave = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        setEditableField(null); // Save changes and exit edit mode
        setError(""); // Clear any errors
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

        if (!["male", "female", "other"].includes(gender.toLowerCase())) {
            return "Gender must be 'Male', 'Female', or 'Other'.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Please enter a valid email address.";
        }

        return null;
    };

    return (
        <Container sx={{ paddingTop: "10%" }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                User Information
            </Typography>
            <form>
                <Grid container spacing={2}>
                    {['name', 'age', 'gender', 'email'].map((field) => (
                        <Grid key={field} item xs={12} container alignItems="center">
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={userInfo[field]}
                                    onChange={handleChange}
                                    select={field === 'gender'}
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{
                                        readOnly: editableField !== field,
                                        style: { color: 'white' }
                                    }}
                                    SelectProps={field === 'gender' ? {
                                        style: {
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            border: '1px solid #004c70',
                                        }
                                    } : {}}
                                    inputRef={inputRefs[field]} // Assign the ref here
                                >
                                    {field === 'gender' && (
                                        <>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                {editableField === field ? (
                                    <>
                                        <Button
                                            onClick={handleSave}
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            style={{ marginRight: 8 }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={handleCancel}
                                            color="secondary"
                                            variant="outlined"
                                            size="small"
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <IconButton onClick={() => handleEditClick(field)}>
                                        <EditIcon style={{ color: 'white' }} />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                    {error && (
                        <Grid item xs={12}>
                            <Typography style={{ color: '#ff6347' }}>
                                {error}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default UserInfo;
