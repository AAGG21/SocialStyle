import React, {useState} from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '../services/userServices';


function Login(props) {
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let [buttonTitle, setButtonTitle] = useState('Login');
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();

  return (
    <div style={styles.container}>
        <Paper style={styles.paper}>
            <h2>Login</h2>
            <br></br>
            <TextField variant="outlined" onChange={(e) => { setEmail(e.target.value); }} type="email" label="Email" style={styles.textField} name="email"/>
        
            <TextField variant="outlined" onChange={(e) => { setPassword(e.target.value); }} type="password" label="Password" style={styles.textField} name="password" />
            
            <Button variant="contained" 
                style={styles.buttonRegister}
                onClick={() =>{
                    setButtonTitle('');
                    setLoading(true);
                    let data = {
                        email: email,
                        password: password,
                    }   
        
                    fetchLogin(data).
                    then(res => {
                        setButtonTitle('Login');
                        setLoading(false);
                        if(res.verify){
                            let auth = res.token+"split"+res.id
                            navigate(`/dashboard/${auth}`);
                        }
                    });}
                }
            >{buttonTitle}</Button>
            <Button 
                variant="contained" 
                style={styles.buttonLogin}
                onClick={()=>{ navigate("/register") }}
            >Register</Button>

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
    buttonRegister: {
        textAlign: 'center',
        backgroundColor: '#1668c4',
        color: 'white',
        width :'100%',
        marginTop:15,
        marginBottom:15,
        justifySelf: 'center'
    },
    buttonLogin: {
        textAlign: 'center',
        backgroundColor: '#FE5633',
        color: 'white',
        width :'100%',
        marginTop:1,
        marginBottom:15,
        justifySelf: 'center'
    }
}

export default Login;