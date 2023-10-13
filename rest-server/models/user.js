const { ObjectId } = require('mongodb');
const { interactWithDB } = require('../db/utils');

class User {
  static collection = 'cafe';

  constructor(name, email, password, isNew, google, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isNew = isNew;
    this.google = google;
    this.role = role;
  }

  async save() {
    await interactWithDB(User.collection).insertOne(this);
  }

  async update(id) {
    await interactWithDB(User.collection).replaceOne({ _id: id }, this);
  }

  async delete(id) {
    await interactWithDB(User.collection).deleteOne({ _id: id });
  }

  static async search(input) {
    try {
      if (input.includes('@')) {
        return await interactWithDB(User.collection).findOne({ email: input });
      } else {
        const objectId = new ObjectId(input);
        return await interactWithDB(User.collection).findOne({ _id: objectId });
      }
    }
    catch (err) {
      return null;
    }
  }

  static async getAll() {
    try {
      const cursor = interactWithDB(User.collection).find({});
      return cursor.toArray();
    }
    catch (err) {
      return null;
    }
  }
}

module.exports = User;