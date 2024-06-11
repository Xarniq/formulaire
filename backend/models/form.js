const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    numberOfContractants: Number,
    nameOfContractants: Array,
    user: { type: Schema.Types.ObjectId, ref: 'User' } // Champ pour stocker l'ID de l'utilisateur associé
});

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
