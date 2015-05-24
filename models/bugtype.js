/**
 * Created by xiefuheng on 15/1/25.
 */
/**
 * Created by xiefuheng on 15/4/4.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugSchema = new Schema({
    name: String
});

module.exports = mongoose.model('BugType', BugSchema);