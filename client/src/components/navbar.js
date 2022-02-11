import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    InputBase,
    Badge,
    MenuItem,
    Menu 
} from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Back from '@material-ui/icons/ArrowBack'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { getTask } from "../services/taskServices";

function Navbar({type, name, lastname, auth, setSearch}) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
      <div>
        {type === 'dashboard' ? (
          <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                TASK MANAGER
              </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      onChange={(e) => { setSearch("task", e.target.value); }}
                      style={{ width: 780}}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </div>
                  <div className={classes.grow} /> 
                  <div className={classes.sectionDesktop}>
                    
                    <IconButton
                      edge="end"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => navigate(`/dashboard/${auth}/profile`)}
                    >
                      <p style={{fontSize: 17, margin: 8}}>{name} {lastname}</p>
                      <AccountCircle />
                    </IconButton>
                  </div>
            </Toolbar>
          </AppBar>
        </div>
        ):(
          <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => {navigate(`/dashboard/${auth}`)}}
            >
              <Back />
            </IconButton>
            <Typography className={classes.title} style={{marginLeft: '41%'}} variant="h6" noWrap>
              {type}
            </Typography> 
          </Toolbar>
        </AppBar>
      </div>
        )}
      </div>
    );
}


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(50),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

export default Navbar;