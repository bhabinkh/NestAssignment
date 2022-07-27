import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ObjectID } from 'typeorm';

@InputType()
export class CreatePostInput {
  @IsString()
  @IsNotEmpty({ message: 'PostTitle is required' })
  postTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'PostDescription is required' })
  postDescription: string;

  @IsString()
  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  
}
