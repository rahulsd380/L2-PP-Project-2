import express,{ Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { userRoutes } from "./app/modules/users/users.route";
import globalErrorHabdeler from "./app/middlewares/globalErrorHandeler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router)

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/api", getAController);

app.use(globalErrorHabdeler);

app.use(notFound)

export default app;
