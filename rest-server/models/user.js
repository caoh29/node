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

  async saveOne() {
    await interactWithDB(User.collection).insertOne(this);
  }

  static async checkEmail(email) {
    try {
      const user = await interactWithDB(User.collection).findOne({ email });
      return user;
    }
    catch (err) {
      return false;
    }
  }
}

module.exports = User;