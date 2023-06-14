import express from 'express'
import taskRoutes from './taskRoutes';
import { connectedToMongo } from './models/conexion';
import {config} from './config'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = config.PORT;

app.listen(port, () =>{
  console.log("server running on port ", port)
});

connectedToMongo();

app.use('/tasks', taskRoutes);

export default app;