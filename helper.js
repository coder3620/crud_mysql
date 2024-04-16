const db = require("./database");
const jwt = require('jsonwebtoken');

class UserHelper {
  async createUser(body) {
    const { name, email, password, age, phone } = body;
    try {
      const [result] = await db.execute(
        "INSERT INTO users (name, email, password, age, phone) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, age, phone]
      );

      const insertId = result.insertId;
      const [rowsData] = await db.execute(
        "SELECT * FROM users WHERE user_id = ?",
        [insertId]
      );
      
      console.log("Inserted data-----", rowsData);
      return rowsData;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(body) {
    try {
    const [user] = await db.execute(
        'SELECT * FROM users WHERE email = ? AND password = ?', [body.email, body.password]
    );

    if (!user.length) {
        throw new Error('Invalid credentials');
    }

    const userData = {
        user_id: user[0].user_id,
        email: user[0].email
    };
    const token = jwt.sign(userData, 'secret123', { expiresIn: '24h' });
    return token;
  }catch(error){
    console.log("error---", error);
    throw error;
  }
}

  async getAllUsers() {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(query) {
    try {
      console.log("query -------", query.user_id);
      const [rows] = await db.execute("SELECT * FROM users WHERE user_id = ?", [
        query.user_id,
      ]);
      if (rows.length === 0) {
        throw new Error("User not found");
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(body) {
    try {
      const { user_id, name, email, password, age, phone } = body;
      const [rows] = await db.execute(
        "UPDATE users SET name = ?, email = ?, password = ?, age = ?, phone = ? WHERE user_id = ?",
        [name, email, password, age, phone, user_id]
      );
      return rows[0];
    } catch (error) {
      console.log("error-----", error);
      throw error;
    }
  }

  async deleteUser(query) {
    try {
      const [result] = await db.execute("DELETE FROM users WHERE user_id = ?", [
        query.user_id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("User not found or already deleted");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserHelper();
