# News Expolorer Frontend

## Overview

This is a frontend part of the News Explorer project. It is a single page application that allows users to search for news articles by keyword and save their favorite articles to their personal account.

## Technologies

- HTML
- CSS
- JavaScript
- React
- Hooks
- React Router
- Webpack
- Babel

## Screenshot Demo

Nav Bar when not logged in:

<img width="1327" alt="Screen Shot 2022-11-28 at 4 12 54 PM" src="https://user-images.githubusercontent.com/85166713/204299773-c5666e34-6206-4603-b127-e685c0507433.png">

Nav Bar when user is logged in:

<img width="1338" alt="Screen Shot 2022-11-28 at 4 13 09 PM" src="https://user-images.githubusercontent.com/85166713/204299834-efd22012-3a21-4af1-9cab-135a71390795.png">



Popup Forms for Signin in and Signing up:

<img width="1036" alt="Screen Shot 2022-11-28 at 4 13 17 PM" src="https://user-images.githubusercontent.com/85166713/204299934-1f75af7a-f44e-4e72-a6d0-a75c20f028d7.png">


Form Validation on auth forms:

<img width="842" alt="Screen Shot 2022-11-28 at 4 13 31 PM" src="https://user-images.githubusercontent.com/85166713/204300010-8a71ed7e-46cb-42fc-ab0a-5717f21a2130.png">


Search Results:

<img width="1334" alt="Screen Shot 2022-11-28 at 4 13 50 PM" src="https://user-images.githubusercontent.com/85166713/204300105-40f5adda-9561-4833-b422-27d3397366fe.png">


News card can be saved:

<img width="426" alt="Screen Shot 2022-11-28 at 4 13 58 PM" src="https://user-images.githubusercontent.com/85166713/204300212-bceb5d9b-56e3-455e-9bfb-060927008ba0.png">


Saved Articles area for logged in users:

<img width="1265" alt="Screen Shot 2022-11-28 at 4 14 11 PM" src="https://user-images.githubusercontent.com/85166713/204300293-17597728-e8e6-4bab-87ae-d72665b414d4.png">


 

## Features

- Search for news articles by keyword
- Register and login to personal account
- Save articles to personal account
- Delete articles from personal account
- View articles in a separate window
- Programatically navigate between pages
- Dynamically render content
- Frontend consumes data from the News Explorer API (RESTful API)
- Responsive design
- Form validation
- Error handling


## Live Demo

Deployed fullstack app (GCP):[https://solomon-final.students.nomoredomainssbs.ru/](https://solomon-final.students.nomoredomainssbs.ru/)

## View Repositories

Frontend Repo GH: [https://github.com/solomonbarayev/news-explorer-frontend](https://github.com/solomonbarayev/news-explorer-frontend)
Backend Repo GH: [https://github.com/solomonbarayev/news-explorer-api](https://github.com/solomonbarayev/news-explorer-api)

## Setup

To run this project locally:

1. clone backend repo
2. clone frontend repo
3. install dependencies in both repos
4. run backend server with command `npm run dev`
5. run frontend server with command `npm run start`
6. change the `baseUrl` in the frontend repo `src/utils/MainApi.js` to `http://localhost:3000`
