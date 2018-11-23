'use strict'

module.exports = function setupComment (CommentModel, UserModel, PublicationModel) {

    async function createOrUpdate (comment) {
        const cond = {
          where: {
            comentario: comment.comentario
          }
        }
    
        const existingComment = await CommentModel.findOne(cond)
    
        if (existingComment) {
          const updated = await CommentModel.update(comment, cond)

          return updated ? CommentModel.findOne(cond) : existingComment
        }
    
        const result = await CommentModel.create(comment)
        return result.toJSON()
      }
    
      function findAll() {
        return CommentModel.findAll({
          include: [
              {
                model: UserModel,
                as: 'user',
              },
              {
                model: PublicationModel,
                  as: 'publication',
                  include: [{
                    model: UserModel,
                      as: 'user'
                  }]
              }]
        })
      }
    
      function findById (id) {
        return CommentModel.findById(id)
      }
    
      function findByComentario (comentario) {
        return PublicationModel.findOne({
          where: {
            comentario
          },
          include: [{
            model: UserModel, PublicationModel,
            as: 'user',
            as: 'publication'
          }]
        })
      }

      function findByFecha (createdAt) {
        return CommentModel.findOne({
          where: {
            createdAt
          },
          include: [{
            model: UserModel, PublicationModel,
            as: 'user',
            as: 'publication'
          }]
        })
      }

      function findByUser(user) {
        return PublicationModel.findAll({
            where: {
                user
            },
            include: [{
                model: UserModel,
                where: { usuario: Sequelize.col('comment.usuario') }
            }]
        })
      }
    
      function deleteComment (id) {
        return CommentModel.destroy({
          where: {
            id
          }
        })
      }

      

      return {
        findByUser,
        findAll,
        createOrUpdate,
        findById,
        findByComentario,
        findByFecha,
        deleteComment      
      }
}