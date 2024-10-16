1]  http://localhost:5000/api/auth/signup
{
  "username":"user1",
  "password":"user1"
}
response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "user": {
        "_id": "670f5838e89646381ebeaa5b",
        "username": "user1",
        "password": "$2a$10$MsBeHAtVnHL3KbIET3dB8.CyusV6VU9Nfh/a/ZPfw90KZ/c5m5mRO",
        "createdAt": "2024-10-16T06:07:52.547Z",
        "updatedAt": "2024-10-16T06:07:52.547Z",
        "__v": 0
    }
}

2]  http://localhost:5000/api/image/check-similarity
Bearer Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
form-data:
referenceImageUrl: https://res.cloudinary.com/dejzfm6op/image/upload/v1729061683/sevenSisterHill_1_azbuld.jpg
uploadedImage(File): upload a file

response:
{
    "message": "Image similarity calculated successfully",
    "uploadedImageUrl": "https://res.cloudinary.com/dejzfm6op/image/upload/v1729084485/j2uj9ox1buufoo6rfwkq.jpg",
    "similarityScore": 75.88
}

