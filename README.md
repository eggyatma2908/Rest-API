# Zwallet-Backend

Built using Node JS, Express JS and using MVC Architecture.

MVC Architecture:

MVC is an architectural concept in web-based application development that divides web applications into 4 major parts. Where each section has its own duties and responsibilities. The four sections are: router, controller, model and view.

The router contains the logic for the request method
- Controller: In charge of assisting what the model should do, and which view should be based on requests from the user. However, sometimes requests from users do not necessarily require action from the model. For example, such as displaying a page form for user registration.
- Model: Responsible for assisting, preparing, manipulating and organizing data (from the database) according to the controller.
- View: Duty to present information (easily related) to the user according to the requirements of the controller.

# Installation
```
1. Clone the repo
https://github.com/eggyatma2908/Zwallet-Back-End.git

2. Install NPM Packages
npm install

3. Add .env file at root folder project, and add following
PORT = 
DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
BASE_URL = [Backend Deploy]
BASE_URL_FRONT_END = [Frontend Deploy]
ACCESS_TOKEN_KEY = 
REFRESH_TOKEN_KEY = 
EMAIL_USERNAME = 
MAIL_PASSWORD = 
```

# Run the project
```
npm run dev
```

# Rest API
You can view my postman collection <br> <br>
[![run in Postman](https://run.pstmn.io/button.svg)]()

# Related Project
https://github.com/eggyatma2908/Zwallet-Front-End

# Contact
Email : eggyatmariansyah@gmail.com, LinkedIn : https://www.linkedin.com/in/eggyatmariansyah/
