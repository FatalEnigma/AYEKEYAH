function World(game) {
	this.game 		= game;
	this.entities 	= [];
}

World.prototype.addEntity = function(entity) {
	this.entities.push(entity);
}

World.prototype.update = function(frametime) {
	for(var index = 0; index < this.entities.length; ++index) {
		this.entities[index].update();
	}
}