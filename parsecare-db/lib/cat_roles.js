'use strict'

module.exports = function setupCatRoles (RoleModel) {

    async function createOrUpdate (role) {
        const cond = {
          where: {
            rol: role.rol
          }
        }
    
        const existingRole = await RoleModel.findOne(cond)
    
        if (existingRole) {
          const updated = await RoleModel.update(role, cond)

          return updated ? RoleModel.findOne(cond) : existingRole
        }
    
        const result = await RoleModel.create(role)
        return result.toJSON()
      }
    
      function findAll() {
        return RoleModel.findAll()
      }
    
      function findById (id) {
        return RoleModel.findById(id)
      }
    
      function findByRol (rol) {
        return RoleModel.findOne({
          where: {
            rol
          }
        })
      }
    
      function deleteRole (rol) {
        return RoleModel.destroy({
          where: {
            rol
          }
        })
      }

      return {
        findAll,
        createOrUpdate,
        findById,
        findByRol,
        deleteRole
      }
}