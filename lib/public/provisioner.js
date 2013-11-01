
Provisioner = function(method) {
	var message = arguments.list()
	switch(method) {
	case 'new':
		var self = Provisioner.clone()
		self.hosts = []
		// Attach the hub to the docker-out / docker-in exchanges
		self.connected = false
		self.queue = 'ws' + Math.random()
		Message.attach('ws://' + document.location.hostname + ':8888/wot-management/docker-out/%23/' + self.queue +  '/docker-in/ws',
			'running', 'images', 'containers' )
		// Subscribe ourself to the docker responses
		self.ack('docker','connected')
		return self
	case 'connected':
		if (message[1] == this.queue) this.connected = true
		return this
	case 'docker':
		var message = arguments.list()	// [ 'docker','running', hostname, status, [ container info ] ]	
		// subswitch on the docker response
		switch (message[1]) {
			case 'running':
				var host = Host('new', message[2])
				if (message[3] != 200) {
					host('status','down')
					console.error('bad response from ', message[2])
				}
				for (var i = 0; i < message[4].length; ++i) 
					host('add', Container('new', message[4][i].Image))
				this.hosts.push(host)
			break
		}
		return this
	case 'poll':
		Message('running')
		return this
	default:
		console.error('Unknown message ' + JSON.stringify(arguments.list()))
		return this
	}
}

Provisioner('new').when( function() { return this.connected } ,'poll')
