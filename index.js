var OAuth = require('oauth-1.0a');
var debug = require('debug')('3-legged');

module.exports = ThreeLegged;

function ThreeLegged(opt) {
    if(!(this instanceof ThreeLegged)) {
        return new ThreeLegged(opt);
    }

    if(!(opt && opt.consumer && opt.consumer.public && opt.consumer.secret)) {
        throw new Error('consumer.public and consumer.secret options are required');
    }

    if(!(opt.url && opt.url.callback && opt.url.request_token && opt.url.authorize && opt.url.access_token)) {
        throw new Error('url.request_token, url.authorize and url.access_token options are required');
    }

    this.consumer = opt.consumer;
    this.url      = opt.url;

    if(!opt.label) {
        opt.label = {};
    }

    this.label = {};

    this.label.url       = opt.label.url || 'url';
    this.label.method    = opt.label.method || 'method';
    this.label.post_data = opt.label.post_data || 'form';
    this.label.get_data  = opt.label.get_data || 'qs';

    this.signature_method = opt.signature_method;

    this.oauth = OAuth({
        consumer: this.consumer,
        signature_method: this.signature_method
    });
}

ThreeLegged.prototype._log = debug;

ThreeLegged.prototype.requestToken = function() {
    var request_data = {
        url: this.url.request_token,
        method: 'POST',
        data: {
            oauth_callback: this.url.callback
        }
    };

    var request = {};

    request[this.label.url]       = request_data.url;
    request[this.label.method]    = request_data.method;
    request[this.label.post_data] = this.oauth.authorize(request_data);

    this._log('#requestToken', request);

    return request;
};

ThreeLegged.prototype.getAuthorizeUrl = function(oauth_token) {
    if(!(oauth_token)) {
        throw new Error('oauth_token is required');
    }

    var url = this.url.authorize +  '?oauth_token=' + oauth_token;

    this._log('#getAuthorizeUrl', url);

    return url;
};

ThreeLegged.prototype.accessToken = function(oauth_token, oauth_verifier) {
    if(!(oauth_token)) {
        throw new Error('oauth_token is required');
    }

    if(!oauth_verifier) {
        throw new Error('oauth_verifier is required');
    }

    var token = {
        public: oauth_token
    };

    var request_data = {
        url: this.url.access_token,
        method: 'POST',
        data: {
            oauth_verifier: oauth_verifier
        }
    };

    var request = {};

    request[this.label.url]       = request_data.url;
    request[this.label.method]    = request_data.method;
    request[this.label.post_data] = this.oauth.authorize(request_data, token);

    this._log('#accessToken', request);

    return request;
};

ThreeLegged.prototype.get = function(url, token, data) {
    if(!url) {
        throw new Error('url is required');
    }

    if(!(token && token.public && token.secret)) {
        throw new Error('token.public and token.secret are required');
    }

    data = data || {};

    var request_data = {
        url: url,
        method: 'GET',
        data: data
    };

    var request = {};

    request[this.label.url]      = request_data.url;
    request[this.label.method]   = request_data.method;
    request[this.label.get_data] = this.oauth.authorize(request_data, token);

    this._log('#get', request);

    return request;
};

ThreeLegged.prototype.post = function(url, token, data) {
    if(!url) {
        throw new Error('url is required');
    }

    if(!(token && token.public && token.secret)) {
        throw new Error('token.public and token.secret are required');
    }

    data = data || {};

    var request_data = {
        url: url,
        method: 'POST',
        data: data
    };

    var request = {};

    request[this.label.url]      = request_data.url;
    request[this.label.method]   = request_data.method;
    request[this.label.post_data] = this.oauth.authorize(request_data, token);

    this._log('#post', request);

    return request;
};