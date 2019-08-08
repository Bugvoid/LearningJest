const bcrypt = require("bcryptjs");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Luan",
      email: "bugvoid404@gmail.com",
      password: "12wa788"
    });

    const compareHash = await bcrypt.compare("12wa788", user.password_hash);
    expect(compareHash).toBe(true);
  });
});
