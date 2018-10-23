'use strict'

module.exports = function setupPublication (PublicationModel, UserModel) {

    async function createOrUpdate (publication) {
        const cond = {
          where: {
            contenido: publication.contenido
          }
        }
    
        const existingPublication = await PublicationModel.findOne(cond)
    
        if (existingPublication) {
          const updated = await PublicationModel.update(publication, cond)

          return updated ? PublicationModel.findOne(cond) : existingPublication
        }
    
        const result = await PublicationModel.create(publication)
        return result.toJSON()
      }
    
      function findAll() {
        return PublicationModel.findAll()
      }
    
      function findById (id) {
        return PublicationModel.findById(id)
      }
    
      function findByTopic (topic) {
        return PublicationModel.findOne({
          where: {
            topic
          }
        })
      }

      function findByFecha (createdAt) {
        return PublicationModel.findOne({
          where: {
            createdAt
          }
        })
      }

      function findByUser(user) {
        return PublicationModel.findAll({
            where: {
                user
            },
            include: [{
                model: UserModel,
                where: { usuario: Sequelize.col('publicacione.usuario') }
            }]
        })
      }
    
      function deletePublication (id) {
        return PublicationModel.destroy({
          where: {
            id
          }
        })
      }

      return {
        findAll,
        createOrUpdate,
        findById,
        findByTopic,
        findByFecha,
        deletePublication
      }
}