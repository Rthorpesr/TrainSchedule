# TrainSchedule

Author: Reginald D. Thorpe Sr.
Bootcamp: George Washington University 
during the 4th week of coding BootCamp.

Date: June 28, 2019


Purpose:  
Create a train schedule application that incorporates a Firebase hosted database at captures the arrival and departure times of the trains. Using these times, the arrival time of the next train of that particular train, say the (A-Train) is calculated and shown on screen. 
How it works:

1.)	The user is presented a Train Schedule webpage.

2.)	The user enters the following information and 
     (“clicks”) the submit button.
    a.	Train Name
    b.	Destination
    c.	First time of that train for that day in military format (00:00)
    d.	Frequency (the set time schedule for each train of that type leaving the station)
    
3.)	Clicking the submit button triggers the calculation of the time in minutes until the
     next train of that type. All of the above information (a,b,c,and d) are stored in a database.

4.)	The next rain information is display in a table at the top of the webpage so that the user   
    can see what time the next train is leaving the station. 

Note: Each train name that is entered will display the next train arrival information in the
      top table of arrivals.

Technology used:

1.)	Javascript along with the jQuery library
2.)	HTML
3.)	BootStrap 
4.)	Moment.js
5.)	Firebase (database)


** This app was made responsive for cell-phones and small tablets.


