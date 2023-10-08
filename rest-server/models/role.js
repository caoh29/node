const { interactWithDB } = require('../db/utils');

class Role {
  static collection = 'roles';

  constructor(role) {
    this.role = role;
  }

  async saveOne() {
    await interactWithDB(Role.collection).insertOne(this);
  }

  static async findOne(query) {
    return await interactWithDB(Role.collection).findOne(query);
  }
  static async getAll() {
    return await interactWithDB(Role.collection).find();
  }
}

module.exports = Role;