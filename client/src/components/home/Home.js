import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
          }}
        >
          AI-Powered Career Path Advisor
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}
        >
          Discover your ideal career path with the help of artificial intelligence
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h5" component="h3" gutterBottom>
                Personalized Guidance
              </Typography>
              <Typography variant="body1" paragraph>
                Get tailored career recommendations based on your skills, interests, and goals
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h5" component="h3" gutterBottom>
                Skill Development
              </Typography>
              <Typography variant="body1" paragraph>
                Track your progress and identify skills needed for your desired career path
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Typography variant="h5" component="h3" gutterBottom>
                Career Insights
              </Typography>
              <Typography variant="body1" paragraph>
                Access detailed information about different career paths and their requirements
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 