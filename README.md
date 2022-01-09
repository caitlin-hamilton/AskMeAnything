This project is an 'Ask Me Anything' web application. It was initially a side project for work that turned into my own personal project to learn React & TypeScript,
and to practice my CSS & Flexbox skills.

Background
The initial ask was to allow users to be able to post questions for admin users and upper management to address. Admin users needed a way of organizing the questions asked by users easily prior to the meeting, allowing for a more interactive experience for both users and admin.

The Data
Currently I am using JSON files as my data source. 

User Page
The user page displays all the questions that have been asked me all users. The page sorts questions by the time it was posted first on initial page load up,
but users can sorted by time posted or by number of votes as well
Users can vote on all questions (or revert their previous decision to vote for a question)
Users can ask new questions either as themselves or anonymously

Admin Page
The admins (people who are running the 'Ask Me Anything' meetings), receive all question submissions which are shown on the left hand side of the screen.
Not all questions submitted need be answered due to duplicates etc, so admin can select which questions they would like to address in the 'Ask Me Anything' meeting by dragging and dropping certain questions.
Each question can be assigned a theme to help categorize questions, and can create new themes if they need to
Admin users can also add answers to each question ahead of time

To Do

Move the Admin section to TypeScript & React Hooks
Implement Redux
Add colour to the pages
Move this to AWS.
    I can use RDS for managing my data
    I can use AWS Amplify to host my front end
    I can use AWS Lambda for my backend, as I don't need complicated backend operations using Node.js for practice
    I can use AWS Cognito for handling user logins etc.


Getting Started with Ask Me Anything
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

