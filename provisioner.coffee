# provisioner.coffee
#
# © 2013 David J. Goehrig <dave@dloh.org>
#

express = require 'express'
pontifex = require 'pontifex'
opifex = require 'opifex'

app = express()
app.use express.static("#{__dirname}/public")
app.get '/', ( req, res ) ->
	res.sendfile "#{__dirname}/index.html"

app.get '/pip', (req, res) ->
	res.sendfile "#{__dirname}/pip.js"

console.log "Starting docker management interface..."
opifex('amqp://guest:guest@localhost:5672/wot-management/docker-in/#/docker/docker-out/docker','docker')

console.log "Starting websocket server on 8888"
pontifex('amqp://guest:guest@localhost:5672/wot-management/')('ws://0.0.0.0:8888/')

console.log "Starting web server on 8088"
app.listen 8088

