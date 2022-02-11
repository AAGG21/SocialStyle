require('../services/connectionDB');
const mp = require('multiparty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/User'); 

const userRegistration = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {name, username, lastname, email, password} = fields
            let data = verifyData(username[0], email[0], password[0]);
            if(!data){
                res.status(400).json({title: 'Error', content: data});
            }else{
                hashPassword(password[0]).then(response =>{
                    user.create({ 
                        name: name[0], 
                        lastname: lastname[0], 
                        username: username[0], 
                        email: email[0], 
                        password: response.pass, 
                        avatar: "VACIO" });
                    res.status(200).json({verify: true, text: 'El usuario se ha creado'})
                })
            } 
        }
    })
}

const hashPassword = async (pass) =>{
    let salt = await bcrypt.genSalt();
    pass = await bcrypt.hash(pass, salt);
    return {pass};
}

const verifyData = (username, email, password) => {
    if (username.length < 1 || email.length < 1 || password.length < 1){
        return 'One or more fields empty.';
    }
    else if (username.length < 3 || username.length > 25){
        return 'Username must be between 3 and 25 characters.';
    }
    else if (password.length < 5 || password.length > 30){
        return 'Passwords must be between 5 and 30 characters.';
    }
    else{
        return true;
    }
}

const userLogin = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if(error){
            res.status(400).json({title: 'Error', content: error.message});
        }else{
            let {email, password} = fields
            verifyCredentials(email[0], password[0]).then(result => {
                if (result.verify){
                    res.status(200).json({verify: true, id: result.id, title: 'Success', token: result.token, email: result.email, name: result.user_data, avatar: result.avatar});
                }
                else{
                    res.status(403).json({verify: false, title: 'Error', token: result.message});
                }
            }); 
        }
    })
}

const verifyCredentials = async (email, password) => {
    try{
        let xuser = await user.findOne({ email: {$eq:email} }); 
        if (xuser){
            let same = await bcrypt.compare(password, xuser.password);
            if (same){
                let payload = { email: email, password: password, id: xuser._id, connect: true }
                let token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 60 * 60 *24});
                return {verify: true, id: xuser._id, token: token, email: email,user_data: xuser.name+" "+xuser.lastname, avatar: xuser.avatar ,message: 'Login success.'};
            }
            else{
                return {verify: false, token: null, message: 'Incorrect password.'};
            }
        }
        else{
            return {verify: false, token: null, message: 'Password not found.'};
        }
    }catch(e){
        console.log(e);
        return {verify: false, token: null, message: 'Error checking credentials.'};
    }
}

const getUserProfile = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){   
            let xuser = await user.findOne({_id:{$eq:req.params.id}});
            res.status(200).json({verify: true, contentUser: xuser});
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userRegistration,
    userLogin,
    getUserProfile
}