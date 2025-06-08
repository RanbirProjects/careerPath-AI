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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CareerPathCard from './CareerPathCard';
import { useAuth } from '../../context/AuthContext';

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

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [careerPaths, setCareerPaths] = useState([]);
  const [stats, setStats] = useState({
    completedCourses: 0,
    skillsAcquired: 0,
    certifications: 0,
  });

  const fetchData = useMemo(async () => {
    try {
      setLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCareerPaths = [
        {
          id: 1,
          title: 'Full Stack Developer',
          description: 'Master web development from frontend to backend',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
          progress: 65,
          skills: ['React', 'Node.js', 'MongoDB'],
          duration: '6 months',
        },
        {
          id: 2,
          title: 'Data Scientist',
          description: 'Learn data analysis and machine learning',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          progress: 30,
          skills: ['Python', 'TensorFlow', 'Data Analysis'],
          duration: '8 months',
        },
        {
          id: 3,
          title: 'UX/UI Designer',
          description: 'Create beautiful and functional user interfaces',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          progress: 45,
          skills: ['Figma', 'User Research', 'Prototyping'],
          duration: '4 months',
        },
      ];

      const mockStats = {
        completedCourses: 12,
        skillsAcquired: 24,
        certifications: 5,
      };

      setCareerPaths(mockCareerPaths);
      setStats(mockStats);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    <Grid item xs={12} md={4}>
      <StyledCard>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Progress"
        />
        <ImageOverlay>
          <Box>
            <Typography variant="h6">Your Progress</Typography>
            <Typography variant="body2">Track your learning journey</Typography>
          </Box>
        </ImageOverlay>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box textAlign="center">
                <TrendingUpIcon color="primary" />
                <Typography variant="h6">{stats.completedCourses}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Courses
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box textAlign="center">
                <SchoolIcon color="primary" />
                <Typography variant="h6">{stats.skillsAcquired}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Skills
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box textAlign="center">
                <StarIcon color="primary" />
                <Typography variant="h6">{stats.certifications}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Certificates
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Grid>
  ), [stats]);

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

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {loading && (
        <LoadingOverlay>
          <CircularProgress size={60} />
        </LoadingOverlay>
      )}
      
      <Grid container spacing={4}>
        {welcomeSection}
        {statsSection}
        {featuredCareerPath}
        {careerPathsGrid}
      </Grid>
    </Container>
  );
};

export default Dashboard; 