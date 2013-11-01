# provisioner.coffee
#
# © 2013 David J. Goehrig <dave@dloh.org>
#

express = require 'express'

app = express()
app.use express.static("#{__dirname}/public")
app.get '/', ( req, res ) ->
	res.sendfile "#{__dirname}/index.html"

app.get '/pip', (req, res) ->
	res.sendfile "#{__dirname}/pip.js"

module.exports = app

