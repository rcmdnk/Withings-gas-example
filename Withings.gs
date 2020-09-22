// How to use
// 1: Set CLIENT_ID and CLIENT_SECRET
// 2: Run `run` function. Go View->Log. You will see URL for authentication.
// 3: Open the URL by the browser and authenticate.
// 4: Re-run `run`. Go View->Log. Now you can see your weight information.

// Register as Withings API partner at https://account.withings.com/partner/add_oauth2
// and get client id and client (consumer) secret.
// At the registration, set callback function like
// https://script.google.com/macros/d/<SCRIPT_ID>/usercallback
// where SCRIPT_ID can be found in the menu: File -> Project properties -> Script Id 
var CLIENT_ID = '...';
var CLIENT_SECRET = '...';

// Set MEASTYPES what you want as comma separated list. 1 is Weight (kg), 6 is fat ratio (%).
// To get other variables, refer https://developer.withings.com/oauth2/#tag/measure
var MEASTYPES = '1,6';

// Set number of days to get measurements.
var DAYS = 30;

/**
 * Authorizes and makes a request to the Withings API.
 */
function run() {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://wbsapi.withings.net/measure';

    var date = new Date() ;
    var enddate = Math.floor(date.getTime() / 1000);
    var startdate = enddate - 60 * 60 * 24 * DAYS;
    var options = {
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      },
      payload: {
        action: 'getmeas',
        meastypes: MEASTYPES,
        category: 1,
        startdate: startdate,
        enddate: enddate
      }
    }
    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());
//    Logger.log(JSON.stringify(result, null, 2));
var ssNew = SpreadsheetApp.getActiveSheet();
Logger.log(ssNew.getName());  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
}

/**
 * Configures the service.
 */
function getService() {
  return OAuth2.createService('Withings')
      // Set the endpoint URLs.
      .setAuthorizationBaseUrl('https://account.withings.com/oauth2_user/authorize2')
      .setTokenUrl('https://account.withings.com/oauth2/token')

      // Set the client ID and secret.
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)

      // Set the name of the callback function that should be invoked to
      // complete the OAuth flow.
      .setCallbackFunction('authCallback')
  
      // Set scope
      .setScope('user.metrics')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

/**
 * Logs the redict URI to register.
 */
function logRedirectUri() {
  Logger.log(OAuth2.getRedirectUri());
}
