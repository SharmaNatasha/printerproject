var DEBUG = 0; // set to 1 to get more details about what the script does while it runs; default = 0
var REPORT_SHEET_NAME = "report"; // the name of the tab where the report data should go
var SETTINGS_SHEET_NAME = "settings"; // the name of the tab where the filters and date range are specified
var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1FVhVzLhkqFPJcDmmTJaRDg2mDC0Vd4fO801Mw7I3T8A/edit?usp=sharing"; // The URL to the Google spreadsheet with your report template
var EMAIL_ADDRESSES = "nats.sha@gmail.com"; // Get notified by email at this address when a new report is ready

function main() {
  var currentSetting = new Object();
  currentSetting.ss = SPREADSHEET_URL;
  
  // Read Settings Sheet
  var settingsSheet = SpreadsheetApp.openByUrl(currentSetting.ss).getSheetByName(SETTINGS_SHEET_NAME);
  var rows = settingsSheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();
  var numSettingsRows = numRows - 1;
  
  var sortString = "";
  var filters = new Array();
  for(var i = 0; i < numRows; i++) {
    var row = values[i];
    var settingName = row[0];
    var settingOperator = row[1];
    var settingValue = row[2];
    var dataType = row[3];
    debug(settingName + " " + settingOperator + " " + settingValue);
    
    if(settingName.toLowerCase().indexOf("report type") != -1) {
      var reportType = settingValue;
    } else if(settingName.toLowerCase().indexOf("date range") != -1) {
      var dateRange = settingValue;
    } else if(settingName.toLowerCase().indexOf("sort order") != -1) {
      var sortDirection = dataType || "DESC";
      if(settingValue) var sortString = "ORDER BY " + settingValue + " " + sortDirection;
      var sortColumnIndex = 1;
    }else {
      if(settingOperator && settingValue) {
        if(dataType.toLowerCase().indexOf("long") != -1 || dataType.toLowerCase().indexOf("double") != -1 || dataType.toLowerCase().indexOf("money") != -1 || dataType.toLowerCase().indexOf("integer") != -1) {
          var filter =  settingName + " " + settingOperator + " " + settingValue;
        } else {
          if(settingValue.indexOf("'") != -1) {
            var filter =  settingName + " " + settingOperator + ' "' + settingValue + '"';
          } else if(settingValue.indexOf("'") != -1) {
            var filter =  settingName + " " + settingOperator + " '" + settingValue + "'";
          } else {
            var filter =  settingName + " " + settingOperator + " '" + settingValue + "'";
          }
        }
        debug("filter: " + filter)
        filters.push(filter);
      }
    }
  }
  
  
  // Process the report sheet and fill in the data
  var reportSheet = SpreadsheetApp.openByUrl(currentSetting.ss).getSheetByName(REPORT_SHEET_NAME);
  var rows = reportSheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();
  var numSettingsRows = numRows - 1;
  
  // Read Header Row and match names to settings
  var headerNames = new Array();
  var row = values[0];
  for(var i = 0; i < numCols; i++) {
    var value = row[i];
    headerNames.push(value);
    //debug(value);
  } 
  
  
  
  if(reportType.toLowerCase().indexOf("performance") != -1) {
    var dateString = ' DURING ' + dateRange;
  } else {
    var dateString = "";
  }
  if(filters.length) {
    var query = 'SELECT ' + headerNames.join(",") + ' FROM ' + reportType + ' WHERE ' + filters.join(" AND ") + dateString + " " + sortString;
  } else {
    var query = 'SELECT ' + headerNames.join(",") + ' FROM ' + reportType + dateString + " " + sortString;
  }
  debug(query);
  var report = AdWordsApp.report(query);
  try {
    report.exportToSheet(reportSheet);
    var subject = "Your " + reportType + " for " + dateRange + " for " + AdWordsApp.currentAccount().getName() + " is ready";
    var body = "currentSetting.ss<br>Find your attached report";
    MailApp.sendEmail(EMAIL_ADDRESSES, subject, body);
    Logger.log("Your report is ready at " + currentSetting.ss);
  } catch (e) {
    debug("error: " + e);
  }

}

function debug(text) {
  if(DEBUG) Logger.log(text);
}
