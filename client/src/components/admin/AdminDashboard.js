import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const [usersRes, careerPathsRes, statsRes] = await Promise.all([
        axios.get('/api/admin/users', config),
        axios.get('/api/admin/career-paths', config),
        axios.get('/api/admin/stats', config),
      ]);
      setUsers(usersRes.data);
      setCareerPaths(careerPathsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError('Error loading data');
    }
    setLoading(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setRole(user.role);
    setOpenDialog(true);
  };

  const handleUpdateRole = async () => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      await axios.put(
        `/api/admin/users/${selectedUser._id}`,
        { role },
        config
      );
      setUsers(
        users.map((user) =>
          user._id === selectedUser._id ? { ...user, role } : user
        )
      );
      setOpenDialog(false);
    } catch (err) {
      setError('Error updating user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        };
        await axios.delete(`/api/admin/users/${userId}`, config);
        setUsers(users.filter((user) => user._id !== userId));
        setCareerPaths(
          careerPaths.filter((path) => path.user._id !== userId)
        );
      } catch (err) {
        setError('Error deleting user');
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h6">Total Career Paths</Typography>
                  <Typography variant="h4">{stats.totalCareerPaths}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Users
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Recent Career Paths
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {careerPaths.map((path) => (
                    <TableRow key={path._id}>
                      <TableCell>{path.user.name}</TableCell>
                      <TableCell>{path.title}</TableCell>
                      <TableCell>
                        {new Date(path.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            SelectProps={{
              native: true,
            }}
            sx={{ mt: 2 }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateRole} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 