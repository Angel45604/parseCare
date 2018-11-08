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
        return CommentModel.findAll()
      }
    
      function findById (id) {
        return CommentModel.findById(id)
      }
    
      function findByFecha (createdAt) {
        return CommentModel.findOne({
          where: {
            createdAt
          },
          include: [
            {
                model: UserModel, 
                as: 'user'
            },
            {
                model: PublicationModel,
                as: 'publication'
            }
        ]
        })
      }

      function findByUser(user) {
        return CommentModel.findAll({
            where: {
                user
            },
            include: [{
                model: UserModel,
                where: { usuario: Sequelize.col('comment.usuario') }
            }]
        })
      }

      function findByPublication(publication) {
          return CommentModel.findAll({
              where: {
                  publication
              },
              include: [{
                  model: PublicationModel,
                  where: {publicacion: Sequelize.col('comment.publicacion')}
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
        findByFecha,
        findByPublication,
        deleteComment
      }
}