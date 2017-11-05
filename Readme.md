#OAuth 2 implicit grant flow example.

To run this example http server is needed, e.g miniweb.

Copy `configuration.js` and `index.html` to your http server.

Configuration is placed in config object in `configuration.js` file.

Application is calling google gmail API.
How to register client application at google - https://www.youtube.com/watch?v=0gd4jbKHBWM

##configuration description
    client_id - client id obtain after application is registered in authorization server as client
    authorizationUri - uri to authorization server.
    scope - scope passed to authorization server. Multiple scope can be included separated by white space e.g user car
    response_type - type of the response expected from authorization server. In implicit grant flow it's always 'token'
    redirect_uri - redirection uri passed to authorization server during oauth2 flow
    api_uri - uri to API endpoint
    api_endpoint - name of the API endpoint
    user - email of the user to retrieve information from
