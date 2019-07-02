$(document).ready(function()
    {
          //database processing
          //Step - 1: 
          //Set up "Configuration section"
          //The below configuration and Initalize of Firebase where given to me by Firebase when I set up the database
          //this is my first step to put this info into my program.
          // My web app's Firebase configuration
          var firebaseConfig = 
          {
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
                    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
                    var frequency = $('#frequency-input').val().trim();

                    //step - 5
                    // Move the input into the record structure of the data record
                    // that will want to append this data to, and push it into the 
                    //database, then clear the input fields on the form.

                    console.log('1.) SETTING UP NEW TRAIN VARIABLE');
                    var newTrain =
                         {
                              name:        trainName,
                              destination: Dest,
                              St_time:     trainTime,
                              frequency:   frequency   
                         }
                
 
                         database.ref().push(newTrain);
 
                         console.log("Logging new Train Info");
                         console.log("train name input: "  + newTrain.name);
                         console.log("Destination input: " + newTrain.destination);
                         console.log("TrainTime input: "   + newTrain.St_time);
                         console.log("Frequency input: "   + newTrain.frequency);

                         //step - 6
                         // Clear the input fields.
                         $('#train-name-input').val("");
                         $('#Destination-input').val("");
                         $('#train-time-input').val("");
                         $('#frequency-input').val("")
              }) 

          database.ref().on("child_added", function(childSnapshot) 
              {               
                   // Store everything into a variable.
                   var trainName = childSnapshot.val().name;
                   var Dest      = childSnapshot.val().destination;
                   var firstTime = childSnapshot.val().St_time;
                   var frequency = childSnapshot.val().frequency;
               
                   console.log("2.) SNAP SHOT VALUES");
                   console.log(trainName);
                   console.log(Dest);
                   console.log(firstTime);
                   console.log(frequency);
                  
                    // First Time (pushed back 1 year to make sure it comes before current time)
                   
                    console.log("** 3.) STARTING ALL THE CALCULATIONS ** ");
                    var tRemainder = moment().diff(moment.unix(firstTime), "minutes") % frequency;
                    var tMinutes = frequency - tRemainder;
                    // To calculate the arrival time, add the tMinutes to the currrent time
                    var tArrival = moment().add(tMinutes, "m").format("hh:mm");
                   
                     // Create the new row
                     var newRow = $("<tr>").append
                     (
                        $("<td>").text(trainName),
                        $("<td>").text(Dest),
                        $("<td>").text(frequency),
                        $("<td>").text(tArrival),
                        $("<td>").text(tMinutes)
                     );


                    // Append the new row to the table
                    $("#train-table > tbody").append(newRow);
               })    
    })
