import { iGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mogo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUsersRepository implements iGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
