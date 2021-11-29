const fs = require("fs");

class FileManager {
  constructor(path) {
    this.path = path;
    this.flags = {
      encoding: "utf-8",
    };
  }

  async save(data) {
    try {
      return fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, 2),
        this.flags
      );
    } catch (error) {
      await this.deleteAll();
      return this.getAll();
    }
  }

  async getData() {
    const content = await fs.promises.readFile(this.path, this.flags);
    return JSON.parse(content);
  }
}

module.exports = FileManager;
