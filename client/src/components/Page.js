import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from '../static/chefsmenu-logo.svg';
import MenuButton from './MenuButton';
import SideBar from './SideBar';
import Main from './Main';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#FFFFFF",
  },
  appBarTitle: {
    flexGrow: 1,
  }
}));

function Page(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.appBarTitle}>
			      <Logo />
           </Typography>
		      <MenuButton />
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

export default Page;