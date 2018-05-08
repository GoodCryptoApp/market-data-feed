
var trades = [];
var pusher;
var channel;
var connected = false;

var CHANNEL_TRADES = 'private-cryptto-trades';
var MAX_LINES = 30

var app = new Vue({
	el: '#app',
	data: {
		trades: trades,
		connected: false,
		subscription_status: null,
		exchangeFilter: "",
		symbolFilter: "",
		apikey: '',
	},
	methods: {
		connectAPI: function() {
			if (pusher) return;
			pusher = new Pusher('35ef78a63946cd79fdc8', {
				wsHost: 'ws.pusherapp.com',
				httpHost: 'sockjs.pusher.com',
				encrypted: true,
				authEndpoint: 'https://cryptto.io/user/api/auth',
				auth: {params: {auth_key: this.apikey.trim()}}
			});
			this.trades.length = 0;
			this.connected = true;
			this.subscription_status = null;
			channel = pusher.subscribe(CHANNEL_TRADES);
			channel.bind('trade', tradeMessageHandler.bind(this));
			channel.bind('pusher:subscription_error', function(status){
				console.log('Subscription error: '+status);
				this.subscription_status = status;
				this.connected = false;
				pusher = null;
			}.bind(this));
		},
		disconnectAPI: function() {
			if (pusher) {
				pusher.disconnect();
				this.connected = false;
				pusher = null;
			}
		}
	},
	filters: {
		timestamp: function(value) {
			var d = new Date(value);
			return d.toISOString();//.replace('T',' ').replace('Z','');
		}
	}
})

function tradeMessageHandler(data) {
	// console.log(data[1], this.exchangeFilter);
	if ((!this.exchangeFilter || this.exchangeFilter==data[1]) &&
		(!this.symbolFilter || this.symbolFilter==data[2]))
		trades.splice(0, 0, data);
	trades.splice(MAX_LINES, MAX_LINES);
}