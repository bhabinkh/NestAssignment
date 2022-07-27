import { Field,  ID, ObjectType } from '@nestjs/graphql';
import {  Entity, ObjectIdColumn, ObjectID, Column  } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  postTitle: string;
  @Column()
  postDescription: string;
  @Column()
  type: string;
  @Column()
  userId:ObjectID;

  
 
}
