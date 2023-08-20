# Backend

## MongoDB
Note: make sure to whitelist any IP addresses that will be accessing the database

## cUrl commands
view data: `curl http://localhost:3000/data`
insert data: `curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"phone\": 781}" http://localhost:3000/insert`
