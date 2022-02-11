import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Navbar from '../../components/navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, getTask, updateTask } from '../../services/taskServices';

export default function CreateTask(props){
    const classes = useStyles();
    const [nameTask, setNameTask] = useState('');
    const [tagTask, setTagTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [imgs, setImg] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [buttonTitle, setButtonTitle] = useState('Create Task');
    const [buttonEdit, setButtonEdit] = useState('Edit Task');
    const [bool, setBool] = useState(true);
    const [contentTasks, setContentTask] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const URLactual = window.location;

    useEffect(()=>{
        if(URLactual.toString().split('/')[5] === 'edit'){
            setBool(false);
            getTask(params.task_id, params.id.split('split')[0]).
            then(res =>{
                setContentTask(res.contentTask);
            })
        }
    }, [])

    return (
        <div>
            {bool ? (
                <div>
                <Navbar type={'CREATE TASK'} auth={params.id} />
                <form className={classes.container} noValidate>
                    <Paper style={styles.paper}>
                        <TextField 
                            onChange={(e) => { setNameTask(e.target.value); }} 
                            type="text" 
                            label="Name Task" 
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined" 
                            name="name"
                        />
                        <TextField 
                            onChange={(e) => { setTagTask(e.target.value); }} 
                            type="text" 
                            label="Tag Task" 
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined" 
                            name="tag"
                        />
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => { setDate(e.target.value); }}
                        />
                        <TextField
                            id="time"
                            label="Hour"
                            type="time"
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={(e) => { setHours(e.target.value); }}
                        />
                        <TextField 
                            onChange={(e) => { setDescriptionTask(e.target.value); }} 
                            type="text" 
                            label="Description Task" 
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined" 
                            name="Description"
                        />
                        <TextField 
                            onChange={(e) => { setImg(e.target.value); }} 
                            type="text" 
                            label="URL" 
                            defaultValue={''}
                            className={classes.textField}
                            variant="outlined" 
                            name="img"
                        />
                        <div >
                            <img 
                                style={{width: '55%', marginLeft: '23%'}}
                                src={imgs} />
                        </div>
                        <Button 
                            variant="contained" 
                            style={styles.buttonLogin}
                            onClick={() =>{
                                setButtonTitle('');
                                let data = {
                                    name: nameTask,
                                    tag: tagTask,
                                    description: descriptionTask,
                                    img: imgs,
                                    date: date,
                                    hour: hours,
                                    token: params.id.split('split')[0]
                                }   
                                createTask(data).
                                then(res => {
                                    setButtonTitle('Create Task');
                                    if(res.verify){
                                        navigate(`/dashboard/${params.id}`);
                                    }
                                });}}
                        >{buttonTitle}</Button>
                    </Paper>
                </form>
            </div>
            ):(
                <div>
                    <Navbar type={'EDIT TASK'} auth={params.id} />
                    <form className={classes.container} noValidate>
                        <Paper style={styles.paper}>
                            <TextField 
                                onChange={(e) => { setNameTask(e.target.value); }} 
                                type="text" 
                                label="Name Task" 
                                defaultValue={contentTasks.name}
                                className={classes.textField}
                                variant="outlined" 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="name"
                            />
                            <TextField 
                                onChange={(e) => { setTagTask(e.target.value); }} 
                                type="text" 
                                label="Tag Task" 
                                defaultValue={contentTasks.tag}
                                className={classes.textField}
                                variant="outlined" 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="tag"
                            />
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                className={classes.textField}
                                defaultValue={contentTasks.date}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => { setDate(e.target.value); }}
                            />
                            <TextField
                                id="time"
                                label="Hour"
                                type="time"
                                defaultValue={contentTasks.hour}
                                className={classes.textField}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                onChange={(e) => { setHours(e.target.value); }}
                            />
                            <TextField 
                                onChange={(e) => { setDescriptionTask(e.target.value); }} 
                                type="text" 
                                label="Description Task" 
                                defaultValue={contentTasks.description}
                                className={classes.textField}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                name="Description"
                            />
                            <TextField 
                                onChange={(e) => { setImg(e.target.value); }} 
                                type="text" 
                                label="URL" 
                                defaultValue={`Kola`}
                                className={classes.textField}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                name="img"
                            />
                            <div >
                                <img 
                                    style={{width: '55%', marginLeft: '23%'}}
                                    src={imgs} />
                            </div>
                            <Button 
                                variant="contained" 
                                style={styles.buttonLogin}
                                onClick={() =>{
                                    setButtonEdit('');
                                    let data = {
                                        name: nameTask,
                                        tag: tagTask,
                                        description: descriptionTask,
                                        img: imgs,
                                        date: date,
                                        hour: hours,
                                        token: params.id.split('split')[0],
                                        task_id: params.task_id
                                    }   
                                    updateTask(data).
                                    then(res => {
                                        console.log(res);
                                        setButtonEdit('Edit Task');
                                        if(res.verify){
                                            navigate(`/dashboard/${params.id}`);
                                        }
                                    });}}
                            >{buttonEdit}</Button>
                        </Paper>
                    </form>
                </div>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: '27%', 
      marginTop: '5%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
      margin: 19
    },
    
  }));

const styles = {
    paper:{
        padding:15, 
        width: '60%'
    },
    buttonLogin: {
        textAlign: 'center',
        backgroundColor: '#1668c4',
        color: 'white',
        width :'100%',
        marginTop:1,
        marginBottom:15,
        justifySelf: 'center'
    }
}
