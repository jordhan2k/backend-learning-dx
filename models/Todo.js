const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    isCompleted : {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

TodoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("todos", TodoSchema);



