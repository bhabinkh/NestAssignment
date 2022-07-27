import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/currentuser';
import {  Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './post.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(data: CreatePostInput): Promise<Post> {
    const post = await this.postRepository.create(data);
   // post.userId = 
    await this.postRepository.save(post);

    return post;
  }

  async findAllPosts(): Promise<Post[]> {
    //const {ID} = CurrentUser;
    const posts = await this.postRepository.find({
      where: {
        type: {$eq: "public"},
        }
    });

    return posts;
  }

  async findById(id: string): Promise<Post> {
  
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
  async updatePost(data: UpdatePostInput): Promise<Post> {
    const post = await this.findById(data.id);

    await this.postRepository.update(post, { ...data });

    const postUpdated = this.postRepository.create({ ...post, ...data });

    return postUpdated;
  }
  
}
