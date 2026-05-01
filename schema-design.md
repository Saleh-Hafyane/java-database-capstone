## MySQL Database Design
Design Logic: We use MySQL for core entities where data integrity is non-negotiable.

Table: patients
id: INT, Primary Key, Auto Increment

first_name: VARCHAR(50), Not Null

last_name: VARCHAR(50), Not Null

email: VARCHAR(100), Unique, Not Null

phone: VARCHAR(20)

date_of_birth: DATE

Table: doctors
id: INT, Primary Key, Auto Increment

name: VARCHAR(100), Not Null

specialization: VARCHAR(100)

email: VARCHAR(100), Unique

Table: appointments
id: INT, Primary Key, Auto Increment

doctor_id: INT, Foreign Key → doctors(id)

patient_id: INT, Foreign Key → patients(id)

appointment_time: DATETIME, Not Null

status: INT (0=Scheduled, 1=Completed, 2=Cancelled)

Table: admins
id: INT, Primary Key, Auto Increment

username: VARCHAR(50), Unique, Not Null

password: VARCHAR(255), Not Null (hashed)

## MongoDB Collection Design
Design Logic: Prescriptions often contain varied metadata (dosage, pharmacy details, refills) that might change depending on the medication type.

{
  "_id": "ObjectId",
  "appointmentId": 101, 
  "patientId": 5,
  "medication": "Amoxicillin",
  "dosage": "500mg",
  "frequency": "Three times a day",
  "duration": "7 days",
  "issuedDate": "2026-05-01",
  "pharmacyDetails": {
    "name": "Central Pharmacy",
    "address": "123 Health St, Rabat"
  },
  "doctorNotes": "Finish the full course even if feeling better."
}