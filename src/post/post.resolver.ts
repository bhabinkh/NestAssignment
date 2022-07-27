import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput): Promise<Post> {
    const post = await this.postService.createPost(data);

    return post;
  }

  @Mutation(() => Post)
  async UpdatePost(
    @Args('data') data: UpdatePostInput,
  ): Promise<Post> {
    const post = await this.postService.updatePost(data);

    return post;
  }

  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    const post = await this.postService.findById(id);

    return post;
  }
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await this.postService.findAllPosts();

    return posts;
  }
}
