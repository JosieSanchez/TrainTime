 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAs-rKfvRHcfbmswhqhRUnH1jk_RIK7kto",
    authDomain: "train-scheduler-86c72.firebaseapp.com",
    databaseURL: "https://train-scheduler-86c72.firebaseio.com",
    storageBucket: "train-scheduler-86c72.appspot.com",
    messagingSenderId: "567482201646"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var desTination = "";
    var firstTrainTime   = "";
    var freQuency ="";

      // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();
      console.log("just checking");

      // INPUT Infor -- Grabbed values from text boxes
      trainName = $("#train-term").val().trim();
      desTination = $("#dest-term").val().trim();
      firstTrainTime = $("#time-term").val().trim();
      freQuency  = $("#freq-term").val().trim();
     

      // Code for handling the push
      database.ref().push({
        trainName: trainName,
        desTination: desTination,
        firstTrainTime: firstTrainTime,  
        freQuency: freQuency,
        
           });

    });
    //===================================================
 database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().desTination);
      console.log(childSnapshot.val().firstTrainTime);//use behind scenes and not display
      console.log(childSnapshot.val().freQuency);
      //________________________________________________



      // console.log(childSnapshot.val().monthsWorked);
     
      // OUTPUT ***
    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";
    // Minute Until Train

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain.format("hh:mm"));

      //full list of items to the well
      $(".table").append("</span><span id='name'> " + childSnapshot.val().trainName +
        " </span><span id='destination'> " + childSnapshot.val().desTination +
        " </span><span id='frequency'> " + childSnapshot.val().freQuency +
        " </span><span id='arriving'> " + childSnapshot.val().arriving + 
        " </span><span id='distance'> " + childSnapshot.val().distance + 
        " </span>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

// Change the HTML to reflect
      // $("#name").html(lastObj.trainName);
      // $("#destination").html(lastObj.desTination);
      // $("#frequency").html(lastObj.freQuency);
      // $("#arriving").html(lastObj.nextArrival);
      // $("#distance").html(lastObj.minutesAway);
     

    });


 