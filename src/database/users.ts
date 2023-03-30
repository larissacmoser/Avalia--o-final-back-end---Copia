import { Note } from "../models/note.model";
import { User } from "../models/user.model";

export const users: User[] = [
  new User("larissa@growdev.com", "gato234", [
    new Note("fruteira", "comprar maçãs"),
  ]),
  new User("marcelo@growdev.com.br", "tiamano2093"),
  new User("matheus@tia.com", "pao12345"),
];
