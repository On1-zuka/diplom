 require('dotenv').config();
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router);

//Обработка ошибки, последней 
app.use(errorHandler);

const start = async()=>{
    try{
        await sequelize.authenticate();//проверить, что соединение установлено успешно
        await sequelize.sync()//Синхронизация моделей с базой данных
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start();