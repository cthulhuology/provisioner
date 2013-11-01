// host.js
//
// © 2013 David J. Goehrig <dave@dloh.org>
//

Host = function(method) {
	var message = arguments.list()
	switch(method) {
	case 'new':
		var self = Host.clone()
		self.hostname = message[1]
		self.x = message[2] || 100
		self.y = message[3] || 100
		self.width = 100
		self.height = 100
		self.containers = []
		self.status = 'up'
		Screen('show',self)
		self.ack('down')
		return self
	case 'status' :
		this.status = message[1]
		return this
	case 'add':
		var container = message[1]
		container('at', this.x + 20, this.y + 24 * this.containers.length + 20)
		this.containers.push(container)
		return this	
	case 'show':
		Screen('show',this)
		return this
	case 'hide':
		Screen('hide',this)
		return this
	case 'draw':
		Screen('save')
			('font', '24px Arial')
			('strokeStyle', 'black')
			('fillStyle', 'black')
		var x = this.x
		var y = this.y
		var height = this.containers.length * 24 + 56
		var width = Screen('measureText',this.hostname)
		Screen('save')
			('fillStyle', this.status == 'up' ? 'green' : 'red')
			('fillText', this.hostname, x, y - 8)
			('restore')
		for (var j = 0; j < this.containers.length; ++j)
			width = width > this.containers[j].width ?
				width :
				this.containers[j].width
		Screen('beginPath')
			('rect',x, y, width, height)
			('closePath')
			('stroke')
			('restore')
		this.width = width
		this.height = height
		return this
	case 'down':
		var x = message[1]
		var y = message[2]
		if ( x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.height) return;
		this.dx = x - this.x
		this.dy = y - this.y
		this.ack('up','move').nack('down')
		return this
	case 'up':
		this.ack('down').nack('up','move')
		return this
	case 'move':
		var x = message[1]
		var y = message[2]
		this.x = x - this.dx
		this.y = y - this.dy
		for (var j = 0; j < this.containers.length; ++j) 
			this.containers[j]('at', this.x + 20, this.y + 24 * j + 20)
		return this
	}

}
