import { User } from 'user/user_interface';
import { Database } from './database_interface';

class LocalDatabase implements Database<User> {
  private database: User[];

  constructor() {
    const users: User[] = [
      { email: 'asergeev@flo.team', password: 'jgF5tn4F' },
      { email: 'vkotikov@flo.team', password: 'po3FGas8' },
      { email: 'tpupkin@flo.team', password: 'tpupkin@flo.team' },
    ];
    this.database = [];
    users.forEach((user) => this.create(user));
  }

  public getAll(): User[] {
    return this.database;
  }

  public getOne(candidate: User): User {
    const user = this.database.find((user) => user.email === candidate.email);
    if (!user) {
      throw new Error('User does not exist');
    }
    return user;
  }

  public create(candidate: User): User {
    try {
      this.getOne(candidate);
    } catch (e) {
      this.database.push(candidate);
      return candidate;
    }
    throw new Error('User already exist');
  }

  public delete(candidate: User): User {
    const user = this.getOne(candidate);
    this.database.filter((user) => user.email !== candidate.email);
    return user;
  }
}

export const localDatabase = new LocalDatabase();
