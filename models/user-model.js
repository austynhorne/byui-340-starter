const pool = require("../database/");

/* Register new user */
async function registerUser(
  user_firstname,
  user_lastname,
  user_email,
  user_password
) {
  try {
    const sql =
      "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [
      user_firstname,
      user_lastname,
      user_email,
      user_password,
    ]);
  } catch (error) {
    return error.message;
  }
}

/* Check for existing email */
async function checkExistingEmail(user_email, excludedEmail = null) {
  try {
    if(excludedEmail) {
      const sql = "SELECT * FROM account WHERE account_email = $1 AND account_email != $2";
      const email = await pool.query(sql, [user_email, excludedEmail]);
      return email.rowCount;
    }
    else {
      const sql = "SELECT * FROM account WHERE account_email = $1"; 
      const email = await pool.query(sql, [user_email]);
      return email.rowCount;
    }
  } catch (error) {
    return error.message;
  }
}

/* Return user data using email address */
async function getUserByEmail(user_email) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1",
      [user_email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

/* Return user data using account id */
async function getUserById(user_id) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_id = $1",
      [user_id]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

/* Update user information */
async function updateUser(user_id, user_firstname, user_lastname, user_email) {
  try{
    const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4"
    const result = await pool.query(sql, [user_firstname, user_lastname, user_email, user_id]);
    return result;
  } catch(error) {
    return new Error("Update failed");
  }
}

/* Update user password */
async function updatePassword(user_id, hashed_password) {
  try{
    const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2"
    const result = await pool.query(sql, [hashed_password, user_id]);
    return result;
  } catch(error) {
    return new Error("Update password failed")
  }
}

/* Get list of all users */
async function getUserList() {
  const sql = "SELECT account_id, account_firstname, account_lastname FROM public.account";
  try {
    const response = await pool.query(sql);
    return response.rows;
  }
  catch(error) {
    return new Error("Failed to get user list");
  }
}

module.exports = { registerUser, checkExistingEmail, getUserByEmail, getUserById, updateUser, updatePassword,getUserList 
};