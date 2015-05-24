/**
 * Created by xiefuheng on 15/1/25.
 */
/**
 * Created by xiefuheng on 15/4/4.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugSchema = new Schema({
    name: String,
    desc: String,
    code: String,
    type: String,
    language: String,
    solve: String,
    create_at: String,
    modify_at: String
});

module.exports = mongoose.model('Bug', BugSchema);