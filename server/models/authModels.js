const mongoose  = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  pastQueries: {type: Array, default: []}  
}); 

const Profile  = mongoose.model("Profile", ProfileSchema)

module.exports = Profile;