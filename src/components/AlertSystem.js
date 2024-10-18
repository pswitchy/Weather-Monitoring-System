// src/components/AlertSystem.js
import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Typography, styled } from '@mui/material';
import { Warning } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledWarningIcon = styled(Warning)(({ theme }) => ({
  color: theme.palette.warning.main,
  marginRight: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const AlertSystem = ({ alerts }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Weather Alerts
        </Typography>
        {alerts.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No active alerts at this time.
          </Typography>
        ) : (
          <List>
            {alerts.map((alert, index) => (
              <StyledListItem key={index}>
                <StyledWarningIcon />
                <ListItemText
                  primary={alert.message}
                  secondary={new Date(alert.time).toLocaleString()}
                />
              </StyledListItem>
            ))}
          </List>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default AlertSystem;