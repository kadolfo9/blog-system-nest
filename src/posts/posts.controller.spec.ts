import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./models/posts.model";
import { AuthService } from "@/auth/auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "@/users/users.module";

describe("PostsController", () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, AuthService],
      imports: [UsersModule, SequelizeModule.forFeature([Post])],
      exports: [PostsService, SequelizeModule],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);

    //controller = new PostsController();
    //service = new PostsService();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of posts", async () => {
      const result = [
        new Post({
          id: 1,
          title: "A",
          content: "A",
          userId: 1,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-02",
        }),
        new Post({
          id: 2,
          title: "B",
          content: "B",
          userId: 1,
          createdAt: "2024-01-01",
          updatedAt: "2024-01-02",
        }),
      ];

      jest.spyOn(service, "getAll").mockImplementation(async () => result);

      expect(await service.getAll()).toBe(result);
    });
  });
});
