
const EventBus = {
	channels: {},
	subscribe(name, listener) {
		if (!this.channels[name]) {
			this.channels[name] = [];
		}
		this.channels[name].push(listener);
	},

	publish(name, data){
		const channel = this.channels[name];
		if (!channel || !channel.length) {
			return;
		}
		channel.forEach(listener => listener(data));
	}
};

export default EventBus;