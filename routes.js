//import controllers here

module.exports = (app) => {
    //define routes that get data here
    app.get('/', function(req,res) {
        res.send({poop: "poop"});
    });
}