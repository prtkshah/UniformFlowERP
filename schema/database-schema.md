# UniformFlow ERP Database Schema

---

# DATABASE OVERVIEW

Database Engine:

- Google Sheets

Architecture:

Client
→ Project
→ Visit Session
→ Measurements
→ Production
→ Packing
→ Delivery

---

# SHEET: Users

| Column | Type | Description |
|---|---|---|
| user_id | String | Unique user ID |
| name | String | User full name |
| email | String | Login email |
| password | String | Password |
| role | String | Admin / Operator / Packing / Delivery |
| active | Boolean | Active status |

---

# SHEET: Clients

| Column | Type | Description |
|---|---|---|
| client_id | String | Unique client ID |
| client_name | String | School / Hospital / Company name |
| client_type | String | School / Hospital / Industry |
| address | String | Client address |
| contact_person | String | Main contact |
| phone | String | Phone number |
| created_at | DateTime | Record creation timestamp |

---

# SHEET: Projects

| Column | Type | Description |
|---|---|---|
| project_id | String | Unique project ID |
| client_id | String | Linked client ID |
| project_name | String | Project name |
| project_type | String | Academic / Industrial |
| academic_year | String | Example: 2026 |
| start_date | Date | Start date |
| end_date | Date | End date |
| status | String | Active / Closed |
| created_at | DateTime | Timestamp |

---

# SHEET: VisitSessions

| Column | Type | Description |
|---|---|---|
| visit_id | String | Unique visit ID |
| project_id | String | Linked project ID |
| visit_name | String | Visit name |
| department | String | Standard / Department |
| division | String | Section / Division |
| visit_date | Date | Visit date |
| location | String | Visit location |
| measurement_team | String | Team name |
| status | String | Workflow status |
| notes | String | Additional notes |
| created_at | DateTime | Timestamp |

---

# VISIT STATUS VALUES

- Scheduled
- In Progress
- Measurement Completed
- Sent To Production
- Production Running
- Packing Running
- Ready For Delivery
- Delivered
- Closed

---

# SHEET: Measurements

| Column | Type | Description |
|---|---|---|
| measurement_id | String | Unique measurement ID |
| visit_id | String | Linked visit ID |
| project_id | String | Linked project ID |
| client_id | String | Linked client ID |
| person_code | String | Unique person code |
| person_name | String | Person name |
| gender | String | Male / Female |
| age | Number | Age |
| attendance_status | String | Attendance |
| measurement_status | String | Workflow status |
| chest | Number | Chest size |
| top_length | Number | Top length |
| waist | Number | Waist |
| bottom_length | Number | Bottom length |
| qty | Number | Quantity |
| top_size | String | Auto-calculated top size |
| bottom_size | String | Auto-calculated bottom size |
| custom_flag | Boolean | Custom size indicator |
| production_status | String | Production workflow |
| packing_status | String | Packing workflow |
| delivery_status | String | Delivery workflow |
| qr_code | String | QR payload |
| measured_by | String | Operator |
| approved_by | String | Approval user |
| timestamp | DateTime | Record timestamp |

---

# ATTENDANCE STATUS VALUES

- Present
- Absent
- Left Early

---

# MEASUREMENT STATUS VALUES

- Pending
- Measured
- Recheck Required
- Approved

---

# PRODUCTION STATUS VALUES

- Pending
- Cutting Done
- Stitching Done
- QC Done

---

# PACKING STATUS VALUES

- Pending
- Packed

---

# DELIVERY STATUS VALUES

- Pending
- Delivered
- Absent

---

# SHEET: SizeRanges

| Column | Type | Description |
|---|---|---|
| gender | String | Male / Female |
| size | String | XS / S / M / L / XL |
| chest_min | Number | Minimum chest |
| chest_max | Number | Maximum chest |
| top_length_min | Number | Minimum top length |
| top_length_max | Number | Maximum top length |
| waist_min | Number | Minimum waist |
| waist_max | Number | Maximum waist |
| bottom_length_min | Number | Minimum bottom length |
| bottom_length_max | Number | Maximum bottom length |

---

# QR FORMAT

visit_id | person_code | top_size | bottom_size

Example:

VISIT_1001 | STU_0001 | M | 30

---

# IMPORTANT RULES

- Do NOT randomly change column order.
- Do NOT insert columns in between existing columns.
- Always update Apps Script indexes when schema changes.
- Keep relational references intact.

---

# FUTURE EXPANSION

Planned future modules:

- RFID workflow
- Barcode scanning
- Inventory management
- Tailor assignment
- Multi-branch support
- WhatsApp integration
- Parent portal
- Analytics dashboard
