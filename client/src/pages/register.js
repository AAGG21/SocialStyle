import React, {useState} from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from '../services/userServices';


function Register(props) {
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [lastname, setLastname] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let [buttonTitle, setButtonTitle] = useState('Register');
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();

  return (
    <div style={styles.container}>
        <Paper style={styles.paper}>
            <h2>Register</h2>
            
            <TextField variant="outlined" onChange={(e) => { setName(e.target.value); }} type="text" label="Name" style={styles.textField} name="name"/>
            
            <TextField variant="outlined" onChange={(e) => { setLastname(e.target.value); }} type="text" label="lastname" style={styles.textField} name="lastname"/>
            
            <TextField variant="outlined" onChange={(e) => { setUsername(e.target.value); }} type="text" label="Username" style={styles.textField} name="username"/>
            
            <TextField variant="outlined" onChange={(e) => { setEmail(e.target.value); }} type="email" label="Email" style={styles.textField} name="email"/>
            
            <TextField variant="outlined" onChange={(e) => { setPassword(e.target.value); }} type="password" label="Password" style={styles.textField} name="password" />
            
            <Button variant="contained" 
                style={styles.btnBlock}
                onClick={() =>{
                    setButtonTitle('');
                    setLoading(true);
                    let data = {
                        username: username,
                        name: name,
                        lastname: lastname,
                        email: email,
                        password: password,
                    }   
        
                    fetchRegister(data).
                    then(res => {
                        setButtonTitle('Register');
                        setLoading(false);
                        if(res.verify){
                            navigate("/");
                        }
                    });}
                }
            >{buttonTitle}</Button>
        </Paper>
    </div>
  );
}

const styles = {
    container:{
        textAlign: 'center', 
        marginLeft: '40%', 
        marginTop: '4%',
    },
    paper:{
      padding:15, 
      width: '25%'
    },
    textField: {
        width :'100%',
        padding: '2',
        marginBottom:15,
    },
    btnBlock: {
        textAlign: 'center',
        backgroundColor: '#1668c4',
        color: 'white',
        width :'100%',
        marginTop:15,
        marginBottom:15,
        justifySelf: 'center'
    }
}

export default Register;