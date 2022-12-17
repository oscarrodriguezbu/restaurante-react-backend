const mongoose = require("mongoose");
mongoose.set('strictQuery', true); //Quita un warning

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CNN, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: true,
    });
    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar la base de datos.");
  }
};

module.exports = {
    dbConnection
}