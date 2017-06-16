# social_project
Project to build a social network application
This is a dev project to learn and use different frameworks and technology
The path i'll follow while developing this project is as follows:


  1. set up express !DONE
  2. set up marko !DONE
  3. set up grunt watch task for scss !DONE
  4. structure code for server and client !DONE
  5. include lodash/jquery/zepto !DONE
  6. create dummy pages !DONE
  7. set up url routing !DONE
  8. set up babel !DONE
  9. study commonJS and AMD
  10. include webpack !DONE
  11. create API parsers for dummy data !DONE
  12. show dummy data !DONE
  13. set up  vue !NOT DOING
  14. include database(sql/mongo/neo4j) for data !DONE
  15. show proper data !DONE
  16. implement ajax  !DONE
  17. set up dot.js for simple modules (maybe not if using vue) !USED MARKO
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

use
```
webpack --progress --watch
```
for bundling and then(grunt not used as of now)
```
nodemon
```
to run server

## UPDATE .ENV FILE
create .env file from sample.env and update the required vars

# TO SETUP DB

install neo4j community edition
set up and run the db server

to create user signup on ```/``` route

the connection to neo4j is in the neo4jconnector.js file
change the login credentials from .env file
```
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("USERNAME", "PASSWORD"));
```


# API 
refer wiki page for API structure https://github.com/raven619claw/social_project/wiki/API-structure

