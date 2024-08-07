import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '@/posts/posts.service';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '@/users/users.module';
import { AuthService } from '@/auth/auth.service';
import { PostsController } from '@/posts/posts.controller';
import { Post } from '@/posts/models/posts.model';

const testPost = {
  id: 1,
  title: 'A test post',
  content: 'A test post content',
  userId: 1,
};

describe('PostsService', () => {
  let service: PostsService;
  let model: typeof Post;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, SequelizeModule.forFeature([Post])],
      exports: [PostsService, SequelizeModule],
      providers: [
        PostsService,
        AuthService,
        {
          provide: getModelToken(Post),
          useValue: {
            findAll: jest.fn(() => [testPost]),
            findOne: jest.fn(),
            create: jest.fn(() => testPost),
            remove: jest.fn(),
            update: jest.fn(() => testPost),
          },
        },
      ],
      controllers: [PostsController],
    }).compile();

    service = module.get<PostsService>(PostsService);
    model = module.get<typeof Post>(getModelToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
