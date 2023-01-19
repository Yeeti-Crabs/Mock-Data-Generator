const mongoose  = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  pastQueries: {type: Array, default: []}  
}); 

const Profile = mongoose.model("Profile", ProfileSchema)


const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 60, default: Date.now }
});


const Session = mongoose.model('Session', sessionSchema);


module.exports = {Profile, Session}