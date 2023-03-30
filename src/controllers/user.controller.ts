import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { users } from "../database/users";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { User } from "../models/user.model";
import { SuccessResponse } from "../util/success.response";

export class UserController {
  public getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let chosenUser = users.find((user: any) => {
        return user.id == id;
      });
      if (chosenUser) {
        return res.status(200).send({
          ok: true,
          message: "User was found",
          data: chosenUser,
        });
      }
      return res.status(404).send({
        ok: false,
        message: "User not found",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public list(req: Request, res: Response) {
    try {
      return res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: [...users],
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).send({
          ok: false,
          message: "Name was not provided",
        });
      }
      if (!password) {
        return res.status(400).send({
          ok: false,
          message: "Password was not provided",
        });
      }
      let newUser = new User(email, password);
      users.push(newUser);
      return res.status(201).send({
        ok: true,
        message: "User successfully created",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const database = new UserDatabase();
      let user = database.getUserByEmail(email);

      if (!user) {
        return RequestError.unauthorized(res);
      }

      if (user.password !== password) {
        return RequestError.forbidden(res);
      }

      return SuccessResponse.ok(res, "Login successfully done", {
        id: user.id,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
