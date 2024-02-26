const app = require('express')();
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const { join } = require('path');
require('dotenv').config();
const { sequelize } = require('./db/sequalize');

app.use(bodyParser.json());

const main = async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate()
        console.log('Successfully connected with postgres');

        const routerDirectory = join(__dirname, '/routers');
        const routes = readdirSync(routerDirectory);
        routes.forEach(file => {
            const route = require(join(routerDirectory, file));
            app.use(route);
        });
    } catch (error) {
        console.log('Error in postgres connection: ', error);
    }
};

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Application started on port: ${PORT}`);
    main();
});
