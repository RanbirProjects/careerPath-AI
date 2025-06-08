import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  School as SchoolIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

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

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const CareerPathCard = ({ path }) => {
  if (!path) return null;

  const {
    title,
    description,
    image,
    progress,
    skills,
    duration,
  } = path;

  return (
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <ImageOverlay>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">Progress: {progress}%</Typography>
          </Box>
        </ImageOverlay>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Progress
          </Typography>
          <ProgressBar variant="determinate" value={progress} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                icon={<CodeIcon />}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            icon={<SchoolIcon />}
            label={duration}
            size="small"
            color="primary"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<TrendingUpIcon />}
          >
            Continue
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CareerPathCard; 