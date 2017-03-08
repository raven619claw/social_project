# social_project
Project to build a social network application
This is a dev project to learn and use different frameworks and technology
The path i'll follow while developing this project is as follows:


  1. set up express !DONE
  2. set up marko !DONE
  3. set up grunt watch task for scss !DONE
  4. structure code for server and client
  5. include lodash/jquery/zepto
  6. create dummy pages
  7. set up url routing
  8. set up babel
  9. study commonJS and AMD
  10. include webpack
  11. create API parsers for dummy data
  12. show dummy data
  13. set up  vue
  14. include database(sql/mongo/neo4j) for data
  15. show proper data
  16. implement ajax 
  17. set up dot.js for simple modules (maybe not if using vue)
  18. set up tracking interface
  19. set up view for viewing tracking data
  20. minify css/js
  21. set up cache server
  22. set up basic chat interface using socket.io


If i have mentioned anything wrong do correct me on how to implement a feature
Will try to not use frameworks for front end and get by with vanilla JS
later will replace all with frameworks

Credit to all ppl who have developed the modules that i will use

# TO RUN
```
npm install
```
then use 
```
nodemon
```
to run server

# TO SETUP DB

install neo4j community edition
set up and run the db server
create a node such as
```
(:USER {name:'user',password:'pass'})
```
the connection to neo4j is in the neo4jconnector.js file
change the login credentials there as follows
replace with your username and password
```
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("USERNAME", "PASSWORD"));
```
will create a common file for db credentials later

# API structure as of now

```
TYPE:GET /apis/users
```
returns list of all users


```
TYPE:GET /apis/users?name=USERNAME
```
returns details of user having name USERNAME

```
TYPE:POST /apis/userAuth

body{
  'name':USERNAME,
  'password':PASSWORD
}
```
returns user authentication data and has flag to identify

```
TYPE:PUT /apis/createUser

body{
  'name':USERNAME,
  'password':PASSWORD
}
```
returns user if created or returns existing user if exists and has flag to identify

