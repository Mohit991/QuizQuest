import React, { useEffect, useState, useContext } from 'react';
import { fetchCategories, fetchLeaderboards } from '../../services/apiService';
import { AppContext } from '../../context/AppContext';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    InputLabel,
    CircularProgress,
    Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardsContent from '../../components/LeaderboardsContent';

const Leaderboards = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [leaderboards, setLeaderboards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        fetchCategories(token)
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories. Please try again later.');
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            fetchLeaderboards(token, selectedCategory.category_id)
                .then(data => {
                    setLeaderboards(data);
                    // console.log("leaderboards data", data)
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching leaderboards:', err);
                    setError('Failed to fetch leaderboard data. Please try again later.');
                    setLoading(false);
                });
        }
    }, [selectedCategory, token]);

    const getTopThreeColors = (index) => {
        switch (index) {
            case 0: return '#FFD700'; // Gold
            case 1: return '#C0C0C0'; // Silver
            case 2: return '#CD7F32'; // Bronze
            default: return '#ffa116';
        }
    };

    return (
        <Box sx={{
            minHeight: "86vh",
            backgroundColor: "#393939",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 12,
            px: 2,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%"
        }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: "#ffa116", mb: 3, textAlign: 'center' }}>
                    Leaderboards
                </Typography>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Alert severity="error" sx={{ mb: 2, backgroundColor: '#ff634720', color: '#ff6347' }}>
                        {error}
                    </Alert>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <FormControl sx={{ m: 1, minWidth: 200, textAlign:"center" }}>
                    <InputLabel id="category-select-label" sx={{
                        color: '#ffa116', '&.Mui-focused': {
                            color: '#ffa116',
                        },
                    }}>Select a category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={selectedCategory ? selectedCategory.category_id : ''}
                        onChange={(e) => setSelectedCategory(categories.find(cat => cat.category_id === parseInt(e.target.value)))}
                        sx={{
                            textAlign:"center",
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffa116',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff8c00',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff8c00',
                            },
                        }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </motion.div>

            {!selectedCategory && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <LeaderboardsContent />
                </motion.div>
            )}

            <AnimatePresence>
                {selectedCategory && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ width: '100%', marginTop: '2rem' }}
                    >
                        <Typography variant="h5" gutterBottom sx={{ color: "#ffa116", mb: 3, textAlign: 'center' }}>
                            Leaderboard for {selectedCategory.category_name}
                        </Typography>
                        <TableContainer component={Paper} sx={{ backgroundColor: '#242424', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#ffa116', textAlign: 'center', fontWeight: 'bold' }}>Rank</TableCell>
                                        <TableCell sx={{ color: '#ffa116', textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell sx={{ color: '#ffa116', textAlign: 'center', fontWeight: 'bold' }}>Score</TableCell>
                                        <TableCell sx={{ color: '#ffa116', textAlign: 'center', fontWeight: 'bold' }}>Achievement</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaderboards.map((leader, index) => (
                                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#2a2a2a' } }}>
                                            <TableCell sx={{ color: 'white', textAlign: 'center', }}>{index + 1}</TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center', }}>{leader.user_name}</TableCell>
                                            <TableCell sx={{ color: 'white', textAlign: 'center', }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <CircularProgress
                                                        variant="determinate"
                                                        value={leader.average_percentage}
                                                        size={40}
                                                        thickness={4}
                                                        sx={{
                                                            color: leader.average_percentage >= 70 ? 'green' : leader.average_percentage >= 40 ? 'orange' : 'red',
                                                            mr: 1
                                                        }}
                                                    />
                                                    <Typography variant="body2">{leader.average_percentage.toFixed(2)}%</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{display:'flex', justifyContent:'center'}}>
                                                    <EmojiEventsIcon sx={{ color: getTopThreeColors(index) }} />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress sx={{ color: '#ffa116' }} />
                </Box>
            )}

            {!loading && leaderboards.length === 0 && selectedCategory && (
                <Typography sx={{ color: 'white', mt: 4 }}>
                    No leaderboard data available for this category.
                </Typography>
            )}
        </Box>
    );
}

export default Leaderboards;

