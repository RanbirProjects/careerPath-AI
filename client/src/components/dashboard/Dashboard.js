import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CareerPathCard from './CareerPathCard';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
  display: 'flex',
  alignItems: 'flex-end',
  padding: theme.spacing(2),
  color: 'white',
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.modal,
}));

const StatsCard = ({ title, value, icon: Icon, color, loading }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: -20,
        right: -20,
        opacity: 0.1,
        transform: 'rotate(30deg)',
      }}
    >
      <Icon sx={{ fontSize: 100, color: color }} />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Icon sx={{ fontSize: 40, color: color, mr: 2 }} />
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
    </Box>
    {loading ? (
      <Skeleton variant="text" width="60%" height={40} />
    ) : (
      <Typography variant="h4" component="p" sx={{ mt: 2 }}>
        {value}
      </Typography>
    )}
  </Paper>
);

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [careerPaths, setCareerPaths] = useState([]);
  const [stats, setStats] = useState({
    skills: 0,
    education: 0,
    experience: 0,
    recommendations: 0,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching dashboard data...');
      const response = await axios.get('/api/profile/dashboard');
      console.log('Dashboard data received:', response.data);

      const { profile } = response.data;
      if (!profile) {
        throw new Error('No profile data received');
      }

      setStats({
        skills: profile.skills?.length || 0,
        education: profile.education?.length || 0,
        experience: profile.experience?.length || 0,
        recommendations: profile.recommendations?.length || 0,
      });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  const welcomeSection = useMemo(() => (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="subtitle1">
          Continue your journey to success with personalized career paths
        </Typography>
      </Paper>
    </Grid>
  ), [user?.name]);

  const statsSection = useMemo(() => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Skills"
          value={stats.skills}
          icon={TrendingUpIcon}
          color="#2196f3"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Education"
          value={stats.education}
          icon={SchoolIcon}
          color="#4caf50"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Experience"
          value={stats.experience}
          icon={WorkIcon}
          color="#ff9800"
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard
          title="Recommendations"
          value={stats.recommendations}
          icon={StarIcon}
          color="#f44336"
          loading={loading}
        />
      </Grid>
    </Grid>
  ), [stats, loading]);

  const featuredCareerPath = useMemo(() => (
    <Grid item xs={12} md={8}>
      <StyledCard>
        <CardMedia
          component="img"
          height="200"
          image="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Featured Career"
        />
        <ImageOverlay>
          <Box>
            <Typography variant="h5">Featured Career Path</Typography>
            <Typography variant="body2">Most popular choice this month</Typography>
          </Box>
        </ImageOverlay>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Full Stack Developer
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Master the art of web development with our comprehensive full-stack program.
            Learn both frontend and backend technologies to build complete web applications.
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip icon={<WorkIcon />} label="High Demand" color="primary" />
            <Chip icon={<SchoolIcon />} label="6 Months" />
            <Chip icon={<StarIcon />} label="4.8/5 Rating" />
          </Stack>
          <Button variant="contained" color="primary">
            Start Learning
          </Button>
        </CardContent>
      </StyledCard>
    </Grid>
  ), []);

  const careerPathsGrid = useMemo(() => (
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        Your Career Paths
      </Typography>
      <Grid container spacing={3}>
        {careerPaths.map((path) => (
          <Grid item xs={12} md={4} key={path.id}>
            <CareerPathCard path={path} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  ), [careerPaths]);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Please log in to view your dashboard.
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchDashboardData}>
              <RefreshIcon sx={{ mr: 1 }} />
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's an overview of your career profile
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {welcomeSection}
        {statsSection}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No recent activity to display.
            </Typography>
          )}
        </Paper>
      </Box>

      <Grid container spacing={4}>
        {featuredCareerPath}
        {careerPathsGrid}
      </Grid>
    </Container>
  );
};

export default Dashboard; 