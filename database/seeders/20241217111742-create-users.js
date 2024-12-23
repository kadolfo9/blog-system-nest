"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Helpers = require("../../dist/global/helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const password = await Helpers.generateHash("admin@1234", 10);

    const [admin] = await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@blogsystem.com",
          password: password,
          role: 1,
        },
      ],
      { returning: ["id"] },
    );

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: "Test Post",
          content:
            "Olá, seja bem vindo ao blog-system. Criado por kadolfo9, utilizando NestJS, PostgreSQL e Docker",
          userId: admin.id,
        },
      ],
      { returning: ["id"] },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
