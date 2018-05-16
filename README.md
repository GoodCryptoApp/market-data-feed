# CRYPTTO Real-time Market Data Feed

Our consolidated feed provides real time normalized trade data from major crypto exchanges **for free**. We do not aggregate or conflate trade data in any way, only normalize the protocols and publish the trade data to subscribers. At the moment we provide access to real time trade information for all pairs listed on Bitstamp, Bitfinex, Poloniex, Quoinex, GDAX, and Gemini. Bitmex, OKEX, and Binance to be added soon with others to follow.

The market data feed is being delivered via our C++ based low-latency market data handler capable of maintaining connections and processing all data from all crypto exchanges on a single commodity server.

CRYPTTO is developing a quantitative crypto trading platform, providing users access to market-neutral fully-automated trading strategies and low-latency intelligent execution algorithms across major exchanges. To find out more, please, visit our website at https://cryptto.io.

If you have any questions or suggestions regarding our data feed, please, join our Telegram chat at https://t.me/cryptto_chat

CRYPTTO uses [Pusher](https://pusher.com) for real time websocket streaming. Please refer to the [Pusher documentation](https://pusher.com/docs/client_api_guide) and libraries to connect to our websocket stream. You can also find an example below.

![Cryptto Market Data Feed Flowchart](https://www.dropbox.com/s/pxpuikr3lz4y3yg/CrypttoDataFeed.png?dl=0)


### Example

Working online example of data feed and feed viewer written in JavaScript can be found [here](https://cryptto-io.github.io/market-data-feed/feed-viewer). Source code for the example is [here](https://github.com/cryptto-io/market-data-feed/tree/master/feed-viewer).



## Receiving Real-time data

### What Is WebSocket?

WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection. The WebSocket protocol was standardized by the IETF as RFC 6455 in 2011, and the WebSocket API in Web IDL is being standardized by the W3C. The WebSocket protocol enables interaction between a web client (such as a browser) and a web server with lower overheads, facilitating real-time data transfer from and to the server.

### Pusher Keys and Channels

* Channel: **private-cryptto-trades**
* Pusher Key: **35ef78a63946cd79fdc8**
* Authenticating endpoint: **https://cryptto.io/user/api/auth**

#### Authentication

We use Pusher user authentication process. For more information please refer to the [Pusher "authenticating users" docs section](https://pusher.com/docs/authenticating_users). Our authenticating endpoint expects a valid "auth_key" properties item. To request your personal auth key, please, [register on our website](https://www.cryptto.io/user/signup) and click ”Request API access” in your personal profile.

### Data Format

We stream data as json array objects.
```JSON
[
  [1525350863972,"GDAX","BTCUSD","A",9230.1,0.375],
  [1525350863975,"BITF","BTCUSD","B",9230.5,0.5]
]
```
* Index 0: Milliseconds timestamp (1525350863972)
* Index 1: Exchange code ("GDAX")
* Index 2: Pair ("BTCUSD")
* Index 3: Trade side "A" for asks, "B" for bids ("A")
* Index 4: Price (9230.1)
* Index 5: Trade size (0.375)

#### Crypto Exchanges Codes

* OKEX: OKEX
* BINA: Binance
* BMEX: BitMEX
* GMNI: Gemini
* PLNX: Poloniex
* BITS: Bitstamp
* BITF: Bitfinex
* QUNX: Quoinex
* GDAX: Global Digital Asset Exchange

## JavaScript Example

``` html
<!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
  <script>
 
	// Enable pusher logging - don't include this in production
	Pusher.logToConsole = true;
 
	var pusher = new Pusher('35ef78a63946cd79fdc8', {
  	wsHost: 'ws.pusherapp.com',
  	httpHost: 'sockjs.pusher.com',
  	encrypted: true,
  	authEndpoint: 'https://cryptto.io/user/api/auth',
  	auth: {params: {auth_key: "<ENTER YOU API KEY HERE>"}}
	});
 
	var channel = pusher.subscribe('private-cryptto-trades');
 
	channel.bind('trade', function(data) {
    	alert(JSON.stringify(data));
	});
 
  </script>
</head>
```

## Node.js Example
Install PusherJS via NPM: 

```npm install pusher-js```

code:
```javascript
const Pusher = require('pusher-js');

//Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('35ef78a63946cd79fdc8', {
	wsHost: 'ws.pusherapp.com',
	httpHost: 'sockjs.pusher.com',
	encrypted: true,
    authEndpoint: 'https://cryptto.io/user/api/auth',
    auth: {params: {auth_key: "<ENTER YOU AUTH KEY HERE>"}}
});

var channel = pusher.subscribe('private-cryptto-trades');
channel.bind('trade', function(data) {
	console.log(data);
});
```


 

