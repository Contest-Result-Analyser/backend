import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "dev.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});