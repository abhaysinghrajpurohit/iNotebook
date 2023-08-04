const mongoose=require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
 
    name:{
        type: String,
        required:true
    },    
    email:{
        type: String,
        required:true,
        unique:true
    },    
    password:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//Sometimes Duplicates data is inserted in database to prevent.. 
// const User=mongoose.model('user',UserSchema);
// User.createIndexes();
// module.exports=User;


// For me now it by default preventing duplicates values so I did not used above indexex creation method
module.exports=mongoose.model('user',UserSchema); 
// mongoose.model(model_name,schema);