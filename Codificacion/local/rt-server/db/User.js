module.exports = function setupUser(UserModel) {
  function findByUsername(username) {
    return UserModel.findOne({
      where: {
        username,
      },
    });
  }
  return {
    findByUsername,
  };
};
