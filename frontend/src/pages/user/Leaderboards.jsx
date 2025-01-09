import { useEffect, useState, useContext } from 'react';
import { fetchCategories, fetchLeaderboards } from '../../services/apiService';
import { AppContext } from '../../context/AppContext';

const Leaderboards = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [leaderboards, setLeaderboards] = useState([]);
    const [categories, setCategories] = useState([]);
    const {token} = useContext(AppContext);
    useEffect(() => {
        fetchCategories(token).then(data => {
            setCategories(data);
        });
    }, [token]);

    useEffect(() => {
        if (selectedCategory) {
            fetchLeaderboards(selectedCategory.id, token).then(data => {
                setLeaderboards(data);
            });
        }
    }, [selectedCategory, token]);

    return (
        <div style={{ textAlign: 'center', paddingTop:"100px" }}>
            <select 
                onChange={(e) => setSelectedCategory(categories.find(cat => cat.id === e.target.value))}
                style={{ color: 'white'}}
            >
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            {selectedCategory && (
                <div>
                    <h2>Leaderboards for {selectedCategory.name}</h2>
                    <ul>
                        {leaderboards.map((leader, index) => (
                            <li key={index}>{leader.name}: {leader.score}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Leaderboards;