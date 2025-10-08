const dotenv = require("dotenv");
import express, { Request, Response } from "express";
import cors from 'cors';
import nutricionistaRoutes from './routes/nutricionista.routes';
import loginRoutes from './routes/login.routes';
import pacienteRoutes from './routes/paciente.routes';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api', nutricionistaRoutes);
app.use('/api', loginRoutes);
app.use('/api', pacienteRoutes)


app.listen(PORT, () => { 
  console.log("Servidor rodando na porta: ", PORT, " 🚀"); 
}).on("error", (error) => {
  throw new Error(error.message);
})