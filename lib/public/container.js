// container.js
//
// © 2013 David J. Goehrig
//

Container = function(method) {
	var message = arguments.list()
	switch(method) {
	case 'new': 
		var self = Container.clone()
		self.module = message[1]
		self.x = message[2]
		self.y = message[3]
		self.width = 0
		self.height = 0
		self.status = 'up'
		Screen('show',self)
		this.ack('down')
		return self;
	case 'status' :
		this.status = message[1]
		return this
	case 'show':
		Screen('show',this)
		return this
	case 'hide':
		Screen('hide',this)
		return this
	case 'at': 
		this.x = message[1]
		this.y = message[2]
		return this
	case 'draw':
		Screen('save')
			('font', '24px Arial')
			('strokeStyle', 'black')
			('fillStyle', 'black')
			('fillStyle', (this.status == 'up') ? 'green' : 'red')
			('beginPath')
			('fillRect',this.x - 10,this.y, 20, 20 )
			('closePath')
			('fillText',this.module, this.x + 20, this.y + 20)
		this.width = Screen('measureText',this.module)
		Screen('restore')
		return this
	default:
		return this
	}
}
