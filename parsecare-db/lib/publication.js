'use strict'

module.exports = function setupPublication (PublicationModel, UserModel, CommentModel) {

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
        return PublicationModel.findAll({
          include: [
              {
                model: UserModel,
                as: 'user'
              },
              {
                model: CommentModel,
                  as: 'comments',
                  include: [{
                    model: UserModel,
                      as: 'user'
                  }]
              }]
        })
      }
    
      function findById (id) {
        return PublicationModel.findById(id, {
            include: [
                {
                    model: UserModel,
                    as: 'user'
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [{
                        model: UserModel,
                        as: 'user'
                    }]
                }]
        })
      }
    
      function findByTopic (topic) {
        return PublicationModel.findOne({
          where: {
            topic
          },
            include: [
                {
                    model: UserModel,
                    as: 'user'
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [{
                        model: UserModel,
                        as: 'user'
                    }]
                }]
        })
      }

      function findByFecha (createdAt) {
        return PublicationModel.findOne({
          where: {
            createdAt
          },
            include: [
                {
                    model: UserModel,
                    as: 'user'
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [{
                        model: UserModel,
                        as: 'user'
                    }]
                }]
        })
      }

      function findByUser(user) {
        return PublicationModel.findAll({
            where: {
                user
            },
            include: [
                {
                    model: UserModel,
                    where: { usuario: Sequelize.col('publicacione.usuario') }
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [{
                        model: UserModel,
                        as: 'user'
                    }]
                }
            ]
        })
      }
    
      function deletePublication (id) {
        return PublicationModel.destroy({
          where: {
            id
          }
        })
      }

      function insertComment(comment) {
        console.log('AYUDA----------------------------------------------------------------------------------')
        console.log(PublicationModel)
        return PublicationModel
      }

      return {
        findByUser,
        findAll,
        createOrUpdate,
        findById,
        findByTopic,
        findByFecha,
        deletePublication,
        insertComment
      }
}