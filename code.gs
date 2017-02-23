var LABEL_TASK = "Task";
var WUNDERLIST_FORWARDING_ADDRESS = "me@wunderlist.com";

function setup() {
  // Create the label we’ll need
  GmailApp.createLabel(LABEL_TASK);
}

function sendTasksToWunderlist() {
  var taskLabel = GmailApp.getUserLabelByName(LABEL_TASK);
  
  var threads = taskLabel.getThreads();
  
  for (var x in threads) {
    var taskTitle = threads[x].getFirstMessageSubject();
    var taskDescription = threads[x].getPermalink();
    
    Logger.log('Processing ' + taskTitle);
    
    GmailApp.sendEmail(WUNDERLIST_FORWARDING_ADDRESS, taskTitle, taskDescription);
    
    threads[x].removeLabel(taskLabel);
  }
}