$(document).ready(function()
{
      //database processing
      //Step - 1: 
      //Set up "Configuration section"
      //The below configuration and Initalize of Firebase where given to me by Firebase when I set up the database
      //this is my first step to put this info into my program.
      // My web app's Firebase configuration
      var firebaseConfig = {
      apiKey: "AIzaSyDybISz_6GvUQZYf5MMyMhbaWYqjOHlL9Q",
      authDomain: "trainschedule-8c9a3.firebaseapp.com",
      databaseURL: "https://trainschedule-8c9a3.firebaseio.com",
      projectId: "trainschedule-8c9a3",
      storageBucket: "",
      messagingSenderId: "837418452972",
      appId: "1:837418452972:web:a8bf2d0bfe77f29a"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      //Step - 2 Assign a variable to the database and define all Global variabls
      var database = firebase.database();


      //Setup Listener for "Button Submit" ('click')
      //Step - 3 
      $("#addtrain").on("click", function(event) 
      {
           event.preventDefault();

           //step - 4
           //make vars to hold the information that the user inputs.
           var trainName = $('#train-name-input').val().trim();
           var Dest = $('#Destination-input').val().trim();
           var trainTime = $('#train-time-input').val().trim();
           //     var trainTIme =moment($("#time-input").val().trim(), "HH:mm" ).format("HH:mm");
           var firstTime = trainTime;
           var frequency = $('#frequency-input').val().trim();

           //step - 5
           // Move the input into the record structure of the data record
           // that will want to append this data to, and push it into the 
           //database, then clear the input fields on the form.

           var newTrain =
                {
                     name: trainName,
                     destination: Dest,
                     time: trainTime,
                     frequency: frequency
                };   

           database.ref().push(newTrain);

           //step - 6
           // Clear the input fields.
           $('#train-name-input').val("");
           $('#Destination-input').val("");
           $('#train-time-input').val("");
           $('#frequency-input').val("")

           console.log("train name input: " +trainName);
           console.log("Destination input: " +Dest);
           console.log("TrainTime input: " +trainTime);
           console.log("Frequency input: " +frequency);


           // First Time (pushed back 1 year to make sure it comes before current time)
           var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
           console.log(firstTimeConverted);

           // Current Time
           var currentTime = moment();
           console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

           // Difference between the times
           var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
           console.log("DIFFERENCE IN TIME: " + diffTime);

           // Time apart (remainder)
           var tRemainder = diffTime % frequency;
           console.log(tRemainder);

           // Minute Until Train
           var tMinutesTillTrain = frequency - tRemainder;
           console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

           // Next Train
           var nextTrain = moment().add(tMinutesTillTrain, "minutes");
           console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
           console.log("The value of next Train = " + nextTrain);

           
           $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + Dest + "</td><td>" +
           
                frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
      
           // $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + Dest + "</td><td>" +
           // frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
      
                
           })

      //database.on("child_added", function(childSnapshot, prevChildKey)
      database.ref().on('child_added', function(childSnapshot)  
          {

                console.log(childSnapshot.val());

                // assign firebase variables to snapshots.
                var firebaseName = childSnapshot.val().name;
                var firebaseLine = childSnapshot.val().line;
                var firebaseDestination = childSnapshot.val().destination;
                var firebaseTrainTimeInput = childSnapshot.val().trainTime;
                var firebaseFrequency = childSnapshot.val().frequency;
      
                var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
                var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
                var minutes = firebaseFrequency - timeRemainder;

                var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
      
                // Test for correct times and info
                console.log(minutes);
                console.log(nextTrainArrival);
                console.log(moment().format("hh:mm A"));
                console.log(nextTrainArrival);
                console.log(moment().format("X"));

                // Append train info to table on page
                $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"
                + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + 
                "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
           })

})
