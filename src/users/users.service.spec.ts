import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "./models/users.model";

const testUser = {
  id: 1,
  username: "user",
  email: "user@blogsystem.com",
  password: "12345678",
};

describe("UsersService", () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn(),
            create: jest.fn(() => testUser),
            remove: jest.fn(),
            update: jest.fn(() => testUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create a user", () => {
    expect(
      service.create({
        username: "user",
        email: "user@blogsystem.com",
        password: "12345678",
      }),
    ).toHaveBeenCalled();
  });
});
