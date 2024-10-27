# MotoTracker Website
MotoTracker is a Next.js Website used to manage car maintenance and track fuel costs and efficiency.

## Usage
Go to mototracker.xyz and create an account or use the guest account with the following login.
Guest@mototracker.xyz Password: Guest1!!

To get started with the app navigate to the Car Manager page and set up a car entry, 
then navigate to the Maintenance Log page and add mantenance entries.

### Dashboard
The Dashboard displays basic information about the selected car including,
* Car Info
* Car Image
* Fuel Stats
* Time and Miles since for all the routine mainenance categories.

### Maintenance Log
The Maintenance Log is used to manage all of the cars maintenance data and can be used to,
* Add Maintenance of any of the following types, Fuel, Mainenance, Oil Change, Tire Rotation, Air Filter, Inspection, and Registration
* View and Filter all the maintenance entries in each category.
* When adding maintenance you can use the phone camera to take a picure of the odometer on the car and the gas pump to fill in some of the form fields automatically
* Delete Maintenance Entrys with a long tap

## Statistics
The Statistics Page is used to view graphs related to fuel economy including,
* Miles Per Gallon
* Dollars Per Gallon
* Dollars Per Mile

### Car Manager
The Car Manager is used to,
* Add Cars
* Add images to cars
* Share cars with other users
* Select which car you are currently using
* Delete Cars with a long tap

## How Its Made
* Im using Java with Android studio and Gradel to package the app.
* For User Accounts Im using the third party service Auth0 as its a secure method for managing user accounts.
* To make the Charts on the Statistics page im using the gradle package "com.github.PhilJay:MPAndroidChart:v3.1.0"
* For the Text recognition for the gas pump and odomiter photo parsing im using the gradle package "com.google.mlkit:text-recognition:16.0.0"
* For the backend It uses an Express.JS Api I wrote In Typescript [GitHub](https://github.com/Warvan1/MotoTrackeaTypescriptAPI)
