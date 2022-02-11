import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchProfile } from '../services/userServices';
import { getTasks, deleteTask, date } from '../services/taskServices';

function Dashboard(props) {
    const classes = useStyles();
    const params = useParams();
    const navigate = useNavigate();
    const user_id = params.id.split("split");
    const xuser_id = user_id[user_id.length - 1];
    const token = user_id[0];
    const [contentUser, setContentUser] = useState({});
    const [contentTask, setContentTask] = useState([]);
    const [tablaTask, setTablaTask]= useState([]);
    const [search, setSearch] = useState({
      task: '',
      name: ''
    });

    useEffect(()=>{
      if(contentTask || contentUser){
        fetchProfile(xuser_id, token).
        then(res =>{
          if(res.verify){
            setContentUser(res.contentUser);
          }
        });
        
        getTasks(token).
        then(res =>{
          if(res.verify){
            console.log(res.contentTask)
            setContentTask(res.contentTask);
          }
        });
      }
    }, [])

    const getSearch = (name, value) =>{
      setSearch({...search, [name]: value})
      filtrar(search.task);
    }

    const filtrar=(terminoBusqueda)=>{
      let resultadosBusqueda = contentTask.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
          return elemento;
        }
      });
      setTablaTask(resultadosBusqueda);
    }

    return (
      <div >
        <Navbar 
          type={'dashboard'}
          name={contentUser.name}  
          lastname={contentUser.lastname}
          setSearch={getSearch}
          auth={params.id}
        />
        <Tooltip title="Add Task" aria-label="add" >
          <Fab 
            color="primary" 
            className={classes.absolute} 
            onClick={() =>{navigate(`/dashboard/${params.id}/add`);}}>
            <AddIcon/>
          </Fab>
        </Tooltip>
        <div style={{display: 'flex', margin: 25}}>
        { search.task.length > 0 ? (
          tablaTask.map(tasks =>{
              return(
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {contentUser.name}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                      }
                      title={tasks.name}
                      subheader={date(tasks.date.split('-')[2], tasks.date.split('-')[1], tasks.date.split('-')[0])+"    "+tasks.hour}
                    />
                    <CardMedia
                      className={classes.media}
                      image={tasks.img}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography style={{color: 'black'}} variant="body2" color="textSecondary" component="p">
                        {tasks.description}
                      </Typography>
                    </CardContent>
                      <Divider />
                    <CardActions disableSpacing  style={{marginLeft: '63%'}}>
                      <IconButton 
                        aria-label="edit"
                        onClick={() =>{navigate(`/dashboard/${params.id}/edit/${tasks._id}`);}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="delete"
                        onClick={() =>{
                          deleteTask(tasks._id, token).
                          then(res =>{
                            getTasks(token).
                            then(res =>{
                              if(res.verify){
                                console.log(res.contentTask)
                                setContentTask(res.contentTask);
                              }
                            });
                          })
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
              )
            })
          ):(
            contentTask.map(tasks =>{
              return(
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {contentUser.name}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                      }
                      title={tasks.name}
                      subheader={date(tasks.date.split('-')[2], tasks.date.split('-')[1], tasks.date.split('-')[0])+"    "+tasks.hour}
                    />
                    <CardMedia
                      className={classes.media}
                      image={tasks.img}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography style={{color: 'black'}} variant="body2" color="textSecondary" component="p">
                        {tasks.description}
                      </Typography>
                    </CardContent>
                      <Divider />
                    <CardActions disableSpacing  style={{marginLeft: '63%'}}>
                      <IconButton 
                        aria-label="edit"
                        onClick={() =>{navigate(`/dashboard/${params.id}/edit/${tasks._id}`);}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        aria-label="delete"
                        onClick={() =>{
                          deleteTask(tasks._id, token).
                          then(res =>{
                            getTasks(token).
                            then(res =>{
                              if(res.verify){
                                console.log(res.contentTask)
                                setContentTask(res.contentTask);
                              }
                            });
                          })
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
              )
            })
          )}
          
        </div>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 280,
    margin: 20,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '90%', // 16:9
  },
  avatar: {
    backgroundColor: red[700],
    fontSize: 10,
    width: '100%'
  },
}));

export default Dashboard;