import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id'})
  user: User;

  @Column()
  user_id: string;

  @OneToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  book_id: string;

  @Column()
  current_page: number;

  @Column()
  percentage_read: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}