# PulseGenAssignment
Assignment for pulseGen

This project provides a script to fetch filtered reviews from the Twingly.
##Features
Dynamic API 
  URL: Accepts user input for constructing the base URL (e.g., twingly part).
Customizable Inputs: Allows user to specify:
  Company Name: For which reviews are to be fetched.
  Date Range: Start and end dates in YYYY-MM-DDTHH:mm:ssZ format.
  Source : It needs to be entered "twingly"
  
##How to Run
  Open your terminal and enter 
    npm init -y
    npm install axios express
    node fetchReviews.js
    //In inputs provide like 
    Enter the company name : HighRadius
    Enter the start date : 2025-01-17T17:30:00Z
    Enter the end date : 2025-01-27T17:30:00Z
    Enter the Source : twingly
    
