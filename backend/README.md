# Backend

## cUrl commands
view data: `curl http://localhost:3000/data`
insert data: `curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"phone\": 781}" http://localhost:3000/insert`
