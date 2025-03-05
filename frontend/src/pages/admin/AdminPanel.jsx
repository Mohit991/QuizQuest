import React, { useState } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Container, Paper, Grid } from "@mui/material"
import { motion } from "framer-motion"
import { Category, Topic, Dashboard, Settings, Person } from "@mui/icons-material"
import ManageCategories from "./ManageCategories"
import ManageTopics from "./ManageTopics"
// import AdminDashboard from "./AdminDashboard"
// import AdminSettings from "./AdminSettings"
// import AdminProfile from "./AdminProfile"

const AdminPanel = () => {
  const [selectedItem, setSelectedItem] = useState("dashboard")
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: Dashboard, path: "dashboard" },
    { name: "Manage Categories", icon: Category, path: "/admin/categories" },
    { name: "Manage Topics", icon: Topic, path: "/admin/topics" },
    { name: "Manage Questions", icon: Topic, path: "/admin/questions" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
    { name: "Profile", icon: Person, path: "/admin/profile" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  return (
    <Box display="flex" height="100vh" bgcolor="#393939" pt={3}>
      {/* Sidebar */}
      <Box
        component={motion.div}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        bgcolor="#505050"
        color="white"
        width={240}
        p={2}
      >
        <Typography variant="h5" mb={4} color="#ffa116">
          Admin Panel
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              // component={Link}
              // to={item.path}
              onClick={() => {setSelectedItem(item.path);
                navigate(item.path)
              }}
              sx={{
                mb: 1,
                backgroundColor: selectedItem === item.path ? "#ffa116" : "transparent",
                color: selectedItem === item.path ? "black" : "white",
                "&:hover": {
                  backgroundColor: "#ffc44a",
                  color: "black",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4} component={Container} maxWidth="lg">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Paper elevation={3} sx={{ p: 4, backgroundColor: "#505050", color: "#fff", mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                {menuItems.find((item) => item.path === selectedItem).icon &&
                  React.createElement(menuItems.find((item) => item.path === selectedItem).icon, {
                    sx: { fontSize: "3rem", color: "#ffa116" },
                  })}
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h1" color="#ffa116">
                  {menuItems.find((item) => item.path === selectedItem)?.name}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Routes>
            {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
            <Route path="categories" element={<ManageCategories />} />
            <Route path="topics" element={<ManageTopics />} />
            {/* <Route path="settings" element={<AdminSettings />} /> */}
            {/* <Route path="profile" element={<AdminProfile />} /> */}
          </Routes>
        </motion.div>
      </Box>
    </Box>
  )
}

export default AdminPanel

