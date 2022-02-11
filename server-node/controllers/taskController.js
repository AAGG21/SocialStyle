require('../services/connectionDB');
const mp = require('multiparty');
const jwt = require('jsonwebtoken');
const { task } = require('../models/Task'); 

const createTask = (req, res) => {
    let form = new mp.Form();
    form.parse(req, (error, fields, files) => {
        if (error){
            res.status(400).json({title: 'Error', content: error.message});
        }
        else{
            let {name, tag, description, img, date, hour, token} = fields
            insertData(name[0], tag[0], description[0], img[0], date[0], hour[0], token[0]).
            then(response =>{
                if(response.verify){
                    res.status(200).json({verify: response.verify});
                }else{
                    res.status(500).json({verify: response.verify});
                }
            })

        }
    })
}

const insertData = async ( name, tag, description, img, date, hour, token ) =>{
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await task.create({
                user_id: verify.id,
                name: name,
                description: description,
                tag: tag,
                date: date,
                hour: hour,
                img: img
            });
            return {verify: true};
        }else{
            return {verify: false};
        }
    } catch (error) {
        console.log(error);
    }
    
}

const getTasks = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){   
            let xtask = await task.find({user_id:{$eq:verify.id}});
            res.status(200).json({verify: true, contentTask: xtask});
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}

const getTask = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){   
            let xtask = await task.findOne({_id:{$eq:req.params.task_id}});
            res.status(200).json({verify: true, contentTask: xtask});
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async (req, res) =>{
    try {
        let verify = jwt.verify(req.body.token, process.env.JWT_SECRET);
        if(verify.connect){
            await task.updateOne(
                {
                    _id: req.body.task_id
                },
                {
                    name: req.body.name,
                    description: req.body.description,
                    tag: req.body.tag,
                    date: req.body.date,
                    hour: req.body.hour,
                    img: req.body.img
                }
            )
            res.status(200).json({verify: true}) 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    } 

}

const deleteTask = async (req, res) =>{
    let token = req.headers.authtoken;
    try {
        let verify = jwt.verify(token, process.env.JWT_SECRET);
        if(verify.connect){
            await task.deleteOne(
                {
                    _id: req.params.id
                }
            )
            res.status(200).json({verify: true}) 
        }else{
            res.status(400).json({verify: false, text: 'Error'});
        }
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}