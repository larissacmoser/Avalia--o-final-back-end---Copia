import { users } from "./users";

export class UserDatabase {
  public getUserById(id: string) {
    return users.find((user) => {
      return user.id === id;
    });
  }
  public getUserByEmail(email: string) {
    return users.find((user) => {
      return user.email === email;
    });
  }

}
