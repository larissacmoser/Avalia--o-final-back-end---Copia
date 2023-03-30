import { v4 as uuidv4 } from "uuid";
import { Note } from "./note.model";
export class User {
  private _id: string;
  constructor(
    private _email: string,
    private _password: string,
    private _notes: Note[] = []
  ) {
    this._id = uuidv4();
  }
  public get id() {
    return this._id;
  }
  public get notes() {
    return this._notes;
  }
  public set notes(notes: Note[]) {
    this._notes = notes;
  }
  public get email() {
    return this._email;
  }
  public get password() {
    return this._password;
  }
  public static create(
    id: string,
    username: string,
    senha: string,
    notas: Note []
  ) {
    const user = new User (
      username,
      senha,
      notas
    );
    user._id=id;
    return user;
  }
}
