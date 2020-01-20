var QUERIES = [{'attributes' : 'CampaignId',
                'metrics' : 'Clicks,Impressions',
                'sourceReport' : 'CAMPAIGN_PERFORMANCE_REPORT',
                'dateRange' : 'LAST_MONTH',
                'spreadsheetUrl' : 'https://docs.google.com/spreadsheets/d/1FVhVzLhkqFPJcDmmTJaRDg2mDC0Vd4fO801Mw7I3T8A/edit?usp=sharing',
                'tabName' : 'report',
                'reportVersion' : 'v201809 '
               }
               
              ];

var USERDELIMITER = ".";


function main() {
  for(var i in QUERIES) {
    var queryObject = QUERIES[i];
    var attributes = queryObject.attributes.replace(/\s/g, '');
    var attributeArray = attributes.split(",");
    //var segments = queryObject.segments.replace(/\s/g, '');
    //var segmentArray = segments.split(",");
    var metrics = queryObject.metrics.replace(/\s/g, '');
    var metricArray = metrics.split(",");
    var sourceReport = queryObject.sourceReport;
    var dateRange = queryObject.dateRange;
    var spreadsheetUrl = queryObject.spreadsheetUrl;
    var tabName = queryObject.tabName;
    var reportVersion = queryObject.reportVersion;
    //Logger.log(spreadsheetUrl + " " + query);
    var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
    var sheet = spreadsheet.getSheetByName(tabName);
    
    var delimiter = "../|/..";
    var map = new Array();
    var segmentKeyList = new Array();
    var query = "SELECT " + attributes + "," + metrics + " FROM " + sourceReport + " DURING " + dateRange;
    
    var report = AdWordsApp.report(query);
    var rows = report.rows();
    while(rows.hasNext()) {
      var row = rows.next();
      var pivotKey = "";
      	
      for(var i = 0; i < attributeArray.length; i++) {
        var key = attributeArray[i];
        //Logger.log(key);
        var val = row[key];
        //Logger.log(" " + val);
        pivotKey += val + delimiter;
      }
      //Logger.log(pivotKey);
      if(!map[pivotKey]) {
        map[pivotKey] = new Array();
      
    }	
      
      
      /*for(var i = 0; i < segmentArray.length; i++) {
        var segmentKey = "";	
        var key = segmentArray[i];
          //Logger.log(key);
        var val = row[key];
        //Logger.log(" " + val);
        */
        for(var j = 0; j < metricArray.length; j++) {
          var metricName = metricArray[j];
          var metricValue = parseFloat(row[metricName]);
          segmentKey = val + delimiter + metricName;
          //Logger.log(" " + segmentKey);
          
          segmentKeyList[segmentKey] = 1;
          if(!map[pivotKey][segmentKey]) {
            map[pivotKey][segmentKey] = metricValue;
          } else {
            map[pivotKey][segmentKey] += metricValue;
          }
          //Logger.log("   " + metricValue);
          
        }
      //}
      
    }
    
   
    var dataToWrite = new Array();
    
    var headerRow = attributeArray;
    for(var segmentKey in segmentKeyList){
      var cleanSegmentName = segmentKey.replace(delimiter,USERDELIMITER);
      headerRow.push(cleanSegmentName);
      //Logger.log(cleanSegmentName);
    }
    //Logger.log(headerRow);
    
    //dataToWrite.push(headerRow);
    
    for(pivotKey in map) {
      var rowToWrite = new Array();
      var row = map[pivotKey];
      var pivotParts = pivotKey.split(delimiter);
      var lastElement = pivotParts.pop();
      //Logger.log(pivotParts);
      var rowToWrite = rowToWrite.concat(pivotParts);
      for(segmentKey in segmentKeyList) {
        
        var val = map[pivotKey][segmentKey];
        if(!val) val = "";
        //Logger.log(pivotKey);
      	//Logger.log(" " + segmentKey + " : " + val);
      	rowToWrite.push(val);
      }
      //Logger.log(rowToWrite);
      dataToWrite.push(rowToWrite);
    }
    //Logger.log("");
    //Logger.log(dataToWrite);
    var amountOfDataWritten = writeDataToGoogleSheet(dataToWrite, sheet, headerRow, 1);
    if(amountOfDataWritten) Logger.log(amountOfDataWritten + " rows of data written to " + spreadsheetUrl);
    
  }
  
  
  // FUNCTION: writeDataToGoogleSheet
	function writeDataToGoogleSheet(data, sheet, columnsUsedArray, overwrite) {
  
  
  
      // Write Header
      if(overwrite) {
        sheet.clear();
        var toWrite = new Array();
        toWrite.push(columnsUsedArray);
        //Logger.log (toWrite);
        var range = sheet.getRange(1, 1, toWrite.length, toWrite[0].length);
        range.setValues(toWrite);
      }
      
      //var dataAdded = 1;
      if(!overwrite) {
        var startRow = sheet.getLastRow();
        var startColumn = 0; //sheet.getLastColumn();
      } else {
        var startRow = 1; // accounts for 1 row of headers
        var startColumn = 0;
      }
      var maxRows = sheet.getMaxRows();
      var maxColumns = sheet.getMaxColumns();
      Logger.log("startRow: " + startRow + " startColumn: " + startColumn + " dataToWrite.length: " + data.length + " dataToWrite[0].length: " + data[0].length);
      //var range = sheet.getRange(startRow+1, startColumn+1, 20, 20);
      //range.setValues(data);
      var amountWritten = data.length;
      return(amountWritten); 
      
      
    } 
  
}