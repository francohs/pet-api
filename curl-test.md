curl -X POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"Franco","email":"franco2@test.com","password":"123456"}'

curl -X POST http://localhost:3000/pets \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWEyNTAyN2RiYzgzZjM1NzQyM2ZjMGIiLCJlbWFpbCI6ImZyYW5jbzJAdGVzdC5jb20iLCJpYXQiOjE3NzIyNDUwMzEsImV4cCI6MTc3Mjg0OTgzMX0.UX-eQ6diNbGSMRPYWAx_rLVeZi8WqcxTH9U8In2IFqg" \
 -d '{"name":"Luna","species":"dog","breed":"Labrador","birthDate":"2021-03-15"}'

curl http://localhost:3000/pets \
 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWEyNTAyN2RiYzgzZjM1NzQyM2ZjMGIiLCJlbWFpbCI6ImZyYW5jbzJAdGVzdC5jb20iLCJpYXQiOjE3NzIyNDUwMzEsImV4cCI6MTc3Mjg0OTgzMX0.UX-eQ6diNbGSMRPYWAx_rLVeZi8WqcxTH9U8In2IFqg"
