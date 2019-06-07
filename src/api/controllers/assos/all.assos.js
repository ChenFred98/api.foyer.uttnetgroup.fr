const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const axios = require('axios')

module.exports = app => {
  app.get('/assos-all', [isAuth('assos-all')])
  app.get('/assos-all', async (req, res) => {
    const { Orga } = app.locals.models
    try {
      const result = await axios.get(
        `${process.env.ETU_BASEURL}/api/public/orgas`,
        {
          headers: { Authorization: `Bearer ${req.user.access_token}` }
        }
      )
      const assos = result.data.data.map(asso => {
        return {
          login: asso.login,
          name: asso.name,
          descriptionShort: asso.descriptionShort
        }
      })
      const result2 = await axios.get(
        `${process.env.ETU_BASEURL}/api/public/orgas?page=2`,
        {
          headers: { Authorization: `Bearer ${req.user.access_token}` }
        }
      )
      const assos2 = result2.data.data.map(asso => {
        return {
          login: asso.login,
          name: asso.name,
          descriptionShort: asso.descriptionShort
        }
      })
      const result3 = await axios.get(
        `${process.env.ETU_BASEURL}/api/public/orgas?page=3`,
        {
          headers: { Authorization: `Bearer ${req.user.access_token}` }
        }
      )
      const assos3 = result3.data.data.map(asso => {
        return {
          login: asso.login,
          name: asso.name,
          descriptionShort: asso.descriptionShort
        }
      })
      const allasso = assos.concat(assos2).concat(assos3)
      const orgas = await Orga.findAll()
      if (allasso.length !== orgas.length) {
        await Promise.all(
          allasso.forEach(async asso => {
            let orga = orgas.find(o => o.login === asso.login)
            if (!orga) {
              await Orga.create(asso)
            }
          })
        )
      }
      return res
        .status(200)
        .json(allasso)
        .end()
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
