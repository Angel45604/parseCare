'use strict'

module.exports = function setupUser (UserModel) {

    async function createOrUpdate (user) {
        const cond = {
          where: {
            email: user.email
          }
        }
    
        const existingUser = await UserModel.findOne(cond)
    
        if (existingUser) {
          const updated = await UserModel.update(user, cond)

          return updated ? UserModel.findOne(cond) : existingUser
        }
    
        const result = await UserModel.create(user)
        return result.toJSON()
      }
    
      function findAll() {
        return UserModel.findAll()
      }
    
      function findById (id) {
        return UserModel.findById(id)
      }
    
      function findByNickName (nickname) {
        return UserModel.findOne({
          where: {
            nickname
          }
        })
      }

      function findByEmail (email) {
        return UserModel.findOne({
          where: {
            email
          }
        })
      }
    
      function deleteUser (email) {
        return UserModel.destroy({
          where: {
            email
          }
        })
      }

      return {
        findAll,
        createOrUpdate,
        findById,
        findByNickName,
        findByEmail,
        deleteUser
      }
}