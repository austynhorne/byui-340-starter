const userModel = require('../models/user-model'); // Assuming you have a user model

const adminController = {};

// View all users
adminController.viewUsers = async (req, res) => {
  const users = await userModel.getAllUsers(); // Fetch all users from your database
  res.render('admin/users', { title: 'User Management', users });
};

// View a specific user
adminController.viewUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await userModel.getUserById(userId); // Fetch user by ID
  res.render('admin/user-detail', { title: 'User Detail', user });
};

// Edit a specific user
adminController.editUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await userModel.getUserById(userId); // Fetch user by ID
  res.render('admin/edit-user', { title: 'Edit User', user });
};

// Update user info
adminController.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body; // Get updated user info from the request body
  const response = await userModel.updateUser(userId, updatedUserInfo); // Update user in the database

  if (response) {
    req.flash('notice', 'User information updated successfully.');
    res.redirect('/admin/users');
  } else {
    req.flash('error', 'Failed to update user information.');
    res.redirect(`/admin/users/edit/${userId}`);
  }
};

module.exports = adminController;