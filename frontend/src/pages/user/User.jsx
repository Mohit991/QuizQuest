import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Container, Typography, Grid, IconButton, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getUserInfo } from '../../api/api'; // Adjust the import path as necessary
import { AppContext } from '../../context/AppContext';

const User = () => {
    const { userId, token } = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        gender: '',
        email: ''
    });
    const [editableFields, setEditableFields] = useState({
        name: false,
        age: false,
        gender: false,
        email: false
    });
    const [error, setError] = useState("");

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleEditClick = (field) => {
        setEditableFields({
            ...editableFields,
            [field]: !editableFields[field]
        });
    };

    const validateForm = () => {
        const { name, age, gender, email } = userInfo;

        if (!name || !age || !gender || !email) {
            return "All fields are required.";
        }

        if (!/^[A-Za-z]+$/.test(name)) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        // Handle form submission logic here
        console.log('User Info:', userInfo);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                User Information
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    readOnly: !editableFields.name,
                                    style: { color: 'white' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleEditClick('name')}>
                                <EditIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                value={userInfo.age}
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    readOnly: !editableFields.age,
                                    style: { color: 'white' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleEditClick('age')}>
                                <EditIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                name="gender"
                                value={userInfo.gender}
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: 'white' } }}
                                SelectProps={{
                                    style: {
                                        color: 'white',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #004c70',
                                    },
                                }}
                                InputProps={{
                                    readOnly: !editableFields.gender,
                                    style: { color: 'white' }
                                }}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleEditClick('gender')}>
                                <EditIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    readOnly: !editableFields.email,
                                    style: { color: 'white' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleEditClick('email')}>
                                <EditIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography style={{ color: '#ff6347' }}>
                                {error}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default User;
