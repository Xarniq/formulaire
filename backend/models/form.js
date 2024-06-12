const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    numberOfContractants: Number,
    nameOfContractants: Array,
    user: { type: Schema.Types.ObjectId, ref: 'User' } 
});

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
