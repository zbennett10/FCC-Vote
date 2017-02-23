
module.exports = (app) => {
    //define routes here
    app.get('/', function(req,res) {
        res.send({poop: "poop"});
    });
}