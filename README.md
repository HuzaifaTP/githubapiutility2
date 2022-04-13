# Live Search for Github Users
An auto-suggesting search bar powered by search api provided by Github 

## 1. npm install
To install all the project dependencies
## 2. npm start
To start the project on 'http://localhost:3000' in the browser
## 3. USER STORIES
1. As a user I am able to search for any user on Github
2. As a user I am able to see user suggestion as I am typing in the input field
3. As a user I am able to get the image of the Github user I am searching for when I press submit
## TECHNOLOGY USED
1. Front-end: React (Javascript library)
2. Back-end: github Search & github Users API
     - End-point: https://api.github.com/users/{user}/repos:%3E0+followers:%3E0
        - GET response: Repository data corresponding to "user"
