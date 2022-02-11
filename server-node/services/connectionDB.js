const mongoose = require('mongoose'); 

mongoose.connect(process.env.LOCAL_MONGODB, (err) =>{
    if(err){
        console.log(`******************* ERROR IN THE CONNECTION **************`)
    }else{
        console.log(`******************* CORRECT CONNECTION ${process.env.LOCAL_MONGODB} **************`)
    }
});