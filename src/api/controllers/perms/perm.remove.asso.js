const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.delete('/assos/:login/perm', [
    isAuth('perm-remove-asso'),
    isAdmin('perm-remove-asso')
  ])
  app.delete('/assos/:login/perm', async (req, res) => {
    const { Orga } = app.locals.models
    try {
      const { login } = req.params
      let asso = await Orga.findOne({ where: { login } })
      if (!asso) {
        return res
          .status(404)
          .json('NOT_FOUND')
          .end()
      }
      asso.permId = null
      await asso.save()
      return res
        .status(200)
        .json('OK')
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
