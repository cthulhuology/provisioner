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
		Screen.show(self)
		// Hub.send('subscribe','down',self)
		return self;
	case 'status' :
		this.status = message[1]
		return this
	case 'show':
		Screen.show(this)
		return this
	case 'hide':
		Screen.hide(this)
		return this
	case 'at': 
		this.x = message[1]
		this.y = message[2]
		return this
	case 'draw':
		Screen.save()
		Screen.font = '24px Arial'
		Screen.strokeStyle = 'black'
		Screen.fillStyle = 'black'
		Screen.fillStyle = (this.status == 'up') ? 'green' : 'red'
		Screen.beginPath()
		//Screen.arc( this.x, this.y + 10, 10, 0, Math.PI*2)
		//Screen.fill()
		Screen.fillRect(this.x - 10,this.y, 20, 20 )
		Screen.closePath()
		Screen.fillText(this.module, this.x + 20, this.y + 20)
		this.width = Screen.measureText(this.module).width
		Screen.restore()
		return this

	}
}
