import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    title: 'AI-Powered Recommendations',
    description: 'Get personalized career path recommendations based on your skills and interests.',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    title: 'Detailed Roadmaps',
    description: 'Access comprehensive career roadmaps with clear milestones and timelines.',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Learning Resources',
    description: 'Discover curated learning resources to help you achieve your career goals.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: 'Market Insights',
    description: 'Stay informed about job market trends and salary expectations.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ mt: 8, mb: 6 }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox variants={itemVariants}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Discover Your Perfect Career Path
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Let AI guide you through your career journey with personalized recommendations and insights.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ mr: 2, mb: 2 }}
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
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionBox
              variants={itemVariants}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="/career-path-illustration.svg"
                alt="Career Path"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
                }}
              />
            </MotionBox>
          </Grid>
        </Grid>
      </MotionBox>

      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ mt: 8, mb: 6 }}
      >
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionCard
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>

      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ mt: 8, mb: 6 }}
      >
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
          }}
        >
          <MotionBox variants={itemVariants}>
            <Typography variant="h4" gutterBottom>
              Ready to Start Your Career Journey?
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Join thousands of professionals who have found their perfect career path with us.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                mt: 2,
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Get Started Now
            </Button>
          </MotionBox>
        </Paper>
      </MotionBox>
    </Container>
  );
};

export default Home; 