import { v4 as uuidv4 } from "uuid";
export class Note {
  private _id: string;
  private hidden: boolean;

  constructor(private _description: string, private _detailing: string) {
    this._id = uuidv4();
    this.hidden = false;
  }
  public get id() {
    return this._id;
  }
  public get description() {
    return this._description;
  }
  public set description(description: string) {
    this._description = description;
  }
  public get detailing() {
    return this._description;
  }
  public set detailing(detailing: string) {
    this._detailing = detailing;
  }
}
