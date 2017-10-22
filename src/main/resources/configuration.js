var config = {
    client_id:'404117803193-frbll1jm86vnf4j4htpjg2lbltif8vt5.apps.googleusercontent.com',
    authorizationUri:'https://accounts.google.com/o/oauth2/auth',
    api_uri:'https://www.googleapis.com/gmail/v1/users/',
    api_endpoint:'profile',
    redirect_uri:'http://localhost:8000',
    scope:'https://mail.google.com/ https://mail.google.com/ https://mail.google.com/ https://mail.google.com/ https://mail.google.com/',
    response_type:'token',
    user:'oauth.lecture@gmail.com'
}

var oauthWindowHandle = null;
var randomState = null;
var ACCESS_TOKEN_PATH_KEY = 'access_token';

var STATE = {
    CALLBACK:'CALLBACK',
    NEW:'NEW'
}

function getState() {
    var url = new URL(window.location.href);
    if(url.href.includes(ACCESS_TOKEN_PATH_KEY)){
        return STATE.CALLBACK;
    }else {
        return STATE.NEW;
    }
}

function onInit(){
    if(getState() == STATE.CALLBACK){
        handleCallback();
    }
}

function handleOAuth2Data(data) {
    console.dir(data);
    if (data.state == randomState) {
        console.dir("State is ok")
        var callUrl = createApiCallUrl(data);
        $.ajax({
                   'url': callUrl,
                   'success': handleApiResponse
               });
    }
}

function handleApiResponse(data){
    console.dir(data);
    $('#data').text(JSON.stringify(data));
}


function createApiCallUrl(data){
    return config.api_uri + encodeURIComponent(config.user) + "/" + config.api_endpoint
        + "?access_token=" + data.access_token;
}

function startOAuth2() {
    randomState = generateRandom();
    var url = buildAuthorizationUrl(randomState);
    oauthWindowHandle = window.open(url, '_blank', 'width=500,height=400');

}
function generateRandom(){
    return new Date().getTime();
}

function buildAuthorizationUrl(randomState){
    return config.authorizationUri + '?response_type=token'
                                     + '&redirect_uri=' + encodeURIComponent(config.redirect_uri)
                                     + '&client_id=' + encodeURIComponent(config.client_id)
                                     + '&scope=' + encodeURIComponent(config.scope)
                                     + '&state=' + encodeURIComponent(randomState);
}


function parseCallbackUrl(){
    var hrefData = window.location.href.split("#")[1].split("&");
    var state = extractValue(hrefData[0]);
    var access_token = extractValue(hrefData[1]);
    var token_type = extractValue(hrefData[2]);
    var expire_in = extractValue(hrefData[3]);

    return {
        state: state,
        access_token: access_token,
        token_type: token_type,
        expire_in: expire_in
    };
}

function extractValue(keyValuePair){
    return keyValuePair.split("=")[1];
}

function handleCallback(){
    data = parseCallbackUrl();
    window.opener.handleOAuth2Data(data);
    window.close();
}