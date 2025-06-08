import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const ProfileForm = ({ onComplete }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    interests: user.interests || [],
    skills: user.skills || [],
    goals: user.goals || [],
  });
  const [currentInput, setCurrentInput] = useState({
    interests: '',
    skills: '',
    goals: '',
  });

  const handleInputChange = (field) => (e) => {
    setCurrentInput({
      ...currentInput,
      [field]: e.target.value,
    });
  };

  const handleAddItem = (field) => () => {
    if (currentInput[field].trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], currentInput[field].trim()],
      });
      setCurrentInput({
        ...currentInput,
        [field]: '',
      });
    }
  };

  const handleDeleteItem = (field) => (itemToDelete) => () => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== itemToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      onComplete();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Complete Your Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph align="center">
          Please provide your interests, skills, and goals to help us generate personalized career paths.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {['interests', 'skills', 'goals'].map((field) => (
            <Box key={field} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Add ${field}`}
                  value={currentInput[field]}
                  onChange={handleInputChange(field)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem(field)();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddItem(field)}
                  sx={{ minWidth: '100px' }}
                >
                  Add
                </Button>
              </Stack>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData[field].map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={handleDeleteItem(field)(item)}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
          >
            Save Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileForm; 