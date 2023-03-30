import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { Note } from "../models/note.model";

export class NoteController {
  public create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, detailing } = req.body;
      const database = new UserDatabase();

      if (!description || !detailing) {
        return res.status(400).send({
          ok: false,
          message: "Note was not provided",
        });
      }

      const user = database.getUserById(id);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      user.notes = user.notes.concat(new Note(description, detailing));

      return res.status(201).send({
        ok: true,
        message: "Note successfully created",
        data: user,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public update(req: Request, res: Response) {
    try {
      const { id, noteId } = req.params;
      const { description, detailing } = req.body;

      let database = new UserDatabase();
      let myUser = database.getUserById(id);

      let myNote = myUser?.notes.find((note) => {
        return note.id === noteId;
      });

      if (!myNote) {
        return res.status(404).send({
          ok: false,
          message: "Note not found",
        });
      }
      if (description) {
        myNote.description = description;
      }
      if (detailing) {
        myNote.detailing = detailing;
      }

      return res.status(200).send({
        ok: true,
        message: "Note successfully updated",
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public delete(req: Request, res: Response) {
    try {
      const { id, noteId } = req.params;
      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }
      const database = new UserDatabase();
      let myUser = database.getUserById(id);
      if (!myUser) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }
      let noteIndex = myUser.notes.findIndex((note) => {
        return note.id === noteId;
      });

      if (noteIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "Note not found",
        });
      }

      myUser.notes.splice(noteIndex, 1);
      return res.status(200).send({
        ok: true,
        message: "Note successfully deleted",
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public filter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new UserDatabase();

      let chosenUser = database.getUserById(id);
      if (!chosenUser) {
        return RequestError.notFound(res, "User");
      }
      return res.status(200).send({
        ok: true,
        message: "Notes successfully listed",
        data: chosenUser?.notes,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
