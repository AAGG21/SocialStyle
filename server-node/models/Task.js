const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        user_id:{
			type: mongoose.Types.ObjectId
		},
        name:{
            type: String,
            require:true
        },
        description:{
            type: String,
            require:true
        },
        tag:{
            type: String,
            require:true
        },
        date:{
            type: String,
            require:true
        },
        hour:{
            type: String,
            require:true
        },
        img:{
            type: String,
            require:true
        }
    },
    {
        timestamps:true,
        versionKey: false
    }
);

const task = new mongoose.model('tasks', taskSchema);

module.exports = {
    task
}