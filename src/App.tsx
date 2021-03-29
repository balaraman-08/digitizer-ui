import * as React from 'react';
import { useState } from 'react'
import clsx from 'clsx';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// React Router Components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// App Components
import DocumentUploader from './document_upload/DocumentUploader';
import DocumentList from './document_list/DocumentList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerRoot: {
    background: "#0052cc",
    color: "#ffffff"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerIcons: {
    fontSize: 30,
    color: "#ffffff"
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };
  return (
    <Router>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 4 }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              [classes.drawerRoot]: true,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleDrawer} className={classes.drawerIcons}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" key={0}>
              <ListItemIcon> <Icon className={classes.drawerIcons}>document_scanner</Icon></ListItemIcon>
              <ListItemText primary={`Scan Document`} />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/verify-documents" key={1}>
              <ListItemIcon> <Icon className={classes.drawerIcons}>fact_check</Icon></ListItemIcon>
              <ListItemText primary={`Document Verification`} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route path="/" exact>
              <DocumentUploader />
            </Route>
            <Route path="/verify-documents" exact>
              <DocumentList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
