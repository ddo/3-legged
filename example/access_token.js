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

var url = 'http://ddo.me/?oauth_token=er74SPaXsGP0iYxQX3VKG9MdYLqdFNeqYKtEdzuJs&oauth_verifier=VBjdoKFr0DbFtFxp43XdPc1MEn8wLukq0ByehrwDFs';

var data = threelegged.oauth.deParamUrl(url);

console.log(data);

request(threelegged.accessToken(data.oauth_token, data.oauth_verifier), function(err, res, body) {
    console.log(err);

    body = threelegged.oauth.deParam(body);

    console.log(body);
});