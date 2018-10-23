'use strict'

module.exports = function setupUser (UserModel, CatRoleModel) {

    async function createOrUpdate (user) {
        const cond = {
          where: {
            correo: user.correo
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
        return UserModel.findAll({
          include: [{
            model: CatRoleModel, 
            as: 'rol'
          }]
        })
      }
    
      function findById (id) {
        return UserModel.findById(id)
      }
    
      function findByNickName (nickname) {
        return UserModel.findOne({
          where: {
            nickname
          },
          include: [{
            model: CatRoleModel, 
            as: 'rol'
          }]
        })
      }

      function findByEmail (correo) {
        return UserModel.findOne({
          where: {
            correo
          },
          include: [{
            model: CatRoleModel, 
            as: 'rol'
          }]
        })
      }

      function findByRol (rol) {
        return UserModel.findAll({
          where: {
            rols
          },
          include: [{
              model: CatRoleModel,
              where: { rol: Sequelize.col('usuario.rol') }
          }]
      })
      }
    
      function deleteUser (correo) {
        return UserModel.destroy({
          where: {
            correo
          },
        })
      }

      return {
        findAll,
        createOrUpdate,
        findById,
        findByNickName,
        findByEmail,
        findByRol,
        deleteUser
      }
}