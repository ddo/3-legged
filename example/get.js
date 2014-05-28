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

var token = {
    public: '61260444-Rljkdi7ZpqgQA9hZawGlN146e8366y0Vw4UidNc3N',
    secret: '6sikoDVwRveU1jcfAUEgDcZ96u8MC6woidsJ6rf46spIs'
}

request(threelegged.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json', token), function(err, res, body) {

    console.log(err);
    console.log(body);
});