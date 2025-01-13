const sequelize = require('../config/database'); 

const getLeaderboard = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const leaderboardQuery = `
      SELECT 
        up.user_id, 
        u.name AS user_name,
        COUNT(up.user_id) AS quiz_count,
        AVG(up.percentage) AS average_percentage,
        GROUP_CONCAT(DISTINCT t.category_id) AS categories
      FROM user_progress AS up
      INNER JOIN topics AS t ON up.topic_id = t.topic_id
      INNER JOIN users AS u ON up.user_id = u.id
      WHERE t.category_id = :categoryId
      GROUP BY up.user_id, u.name
      ORDER BY quiz_count DESC
      LIMIT 10;
    `;

    const leaderboard = await sequelize.query(leaderboardQuery, {
      replacements: { categoryId },
      type: sequelize.QueryTypes.SELECT
    });

    const leaderboardWithTopCategories = await Promise.all(leaderboard.map(async user => {
      const topCategoriesQuery = `
        SELECT 
          c.category_name
        FROM user_progress AS up
        INNER JOIN topics AS t ON up.topic_id = t.topic_id
        INNER JOIN categories AS c ON t.category_id = c.category_id
        WHERE up.user_id = :userId AND t.category_id = :categoryId
        GROUP BY c.category_name
        ORDER BY COUNT(up.topic_id) DESC
        LIMIT 3;
      `;

      const topCategories = await sequelize.query(topCategoriesQuery, {
        replacements: { userId: user.user_id, categoryId },
        type: sequelize.QueryTypes.SELECT
      });

      const categories = topCategories.map(tc => tc.category_name);

      return {
        ...user,
        categories
      };
    }));

    res.status(200).json(leaderboardWithTopCategories);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getLeaderboard
};
