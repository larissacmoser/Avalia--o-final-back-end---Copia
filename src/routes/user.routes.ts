import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { NoteController } from "../controllers/note.controller";
import { UserValidatorMiddleware } from "../middlewares/user-validator.middleware";

export const userRoutes = () => {
  const app = Router();

  app.get("/", new UserController().list);
  app.get("/:id", new UserController().getById);
  app.get("/:id/notes", new NoteController().filter);
  app.post("/create", new UserController().create);
  app.post(
    "/login",
    UserValidatorMiddleware.validateLoginFields,
    new UserController().login
  );
  app.post("/:id/notes", new NoteController().create);
  app.put("/:id/notes/:noteId", new NoteController().update);
  app.delete("/:id/notes/:noteId", new NoteController().delete);
  app.all("/*", (req, res) => {
    res.send("rota não encontrada");
  });
  return app;
};
