// load up route for madrid
const userRoutes = require('./madrid');

const appRouter = (app, fs) => {
    // default route here that handles empty routes at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the Madrid of Spain Airbnb analysis');
    });

    // run madrid route module here to complete the wire up
    userRoutes(app, fs);
};

module.exports = appRouter;