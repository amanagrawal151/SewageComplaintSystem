const mongoose = require('mongoose')

function connect () {
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb+srv://amanagrawal:Aman@sewage@atlascluster.aww5ops.mongodb.net/sewageComplaint?retryWrites=true&w=majority',{useNewUrlParser: true})
}

module.exports = connect