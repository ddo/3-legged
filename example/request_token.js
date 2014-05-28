var request = require('request');

var Threelegged = require('./../');

var threelegged = Threelegged({
    consumer: {
        public: 'notR4zfLE17rJBzwVeDXHfHzl',
        secret: 'BKxhWrBh3TeAkZRpzd3MVXlq9l5mlrHYwCqg5S8RZ1KF3hyb9f'
    },
    url: {
        callback: 'http://ddo.me',
        request_token: 'https://api.twitter.com/oauth/request_token',
        authorize: 'https://api.twitter.com/oauth/authorize',
        access_token: 'https://api.twitter.com/oauth/access_token'
    }
});

request(threelegged.requestToken(), function(err, res, body) {
    console.log(err);
    
    body = threelegged.oauth.deParam(body);

    console.log(body);

    //open this link
    console.log('open this link');
    console.log(threelegged.getAuthorizeUrl(body.oauth_token));
});