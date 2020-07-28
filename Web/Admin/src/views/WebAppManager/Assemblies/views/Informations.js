import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MyButton from 'components/MyButton';
import { withRouter } from 'react-router-dom';
import authService from 'services/authService.js';
import AdminService from 'services/api.js';
import TextField from '@material-ui/core/TextField';

const Informations = (props) => {
  const { history } = props;
  const token = authService.getToken();
  if (!token) {
    window.location.replace("/login");
  }
  const accessBuildings = authService.getAccess('role_buildings');
  
  return (
    <div>

    </div>
  );
};

export default withRouter(Informations);
