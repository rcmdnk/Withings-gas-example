# Withings-gas-example
Google App Script example for Withings API using [gsuitedevs/apps-script-oauth2](https://github.com/gsuitedevs/apps-script-oauth2).

## Preparation
* Make new [Google App Script project](https://script.google.com/home).
* Make new script named like `Withings` and copy and paste [Withings.gs](https://github.com/rcmdnk/Withings-gas-example/blob/main/Withings.gs) contents.
* Set CLIENT_ID and CLIENT_SECRET
    * Make sure you have a [Withings account](https://account.withings.com/connectionuser/account_create).
    * Register as [Withings API partner here](https://account.withings.com/partner/add_oauth2).
        * callback function should be like: `https://script.google.com/macros/d/<SCRIPT_ID>/usercallback`
        * `SCRIPT_ID` is found in the menu: File -> Project properties -> Script Id 
    * Get client id and client (consumer) secret.

## Get weight information
* Run `run` function.
    * First time you run, go View->Log. You will see URL for authentication.
    * After that, you will see weight information in the log.
  
## Get other information
* Set `MEASTYPES`:  [Withings API | Measure](https://developer.withings.com/oauth2/#tag/measure)
    * 1: Weight, 6: Fat Ratio, 88: Bone Mass, etc...

## Change period to get information
* Set `DAYS`: default is 30 days.
