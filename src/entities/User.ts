import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { IsEmail, IsString, MinLength } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  @MinLength(8)
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}