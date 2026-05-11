# UniformFlow ERP

Mobile-first operational ERP system for uniform measurement, production workflow, packing, QR tracking, sticker generation, and delivery management.

---

# Project Overview

UniformFlow ERP is designed for:

- Schools
- Hospitals
- Industries
- Corporate uniform operations
- Garment contractors
- Bulk measurement campaigns

The system focuses on:

- Fast mobile measurement entry
- Production workflow tracking
- Packing workflow
- Delivery management
- QR-based verification
- Sticker generation
- Operational reporting

---

# Tech Stack

## Frontend

- HTML5
- TailwindCSS
- Vanilla JavaScript
- Mobile-first SPA architecture

## Backend

- Google Apps Script Web App
- REST-like API structure
- JSON response system

## Database

- Google Sheets

## Storage

- Google Drive

---

# ERP Workflow Structure

Client
→ Project
→ Visit Session
→ Measurements
→ Production
→ Packing
→ Delivery

---

# Main Features

## Client Management

- Schools
- Hospitals
- Companies
- Industries

## Project Management

- Academic year projects
- Campaign-based workflow

## Visit Sessions

- Department-wise visits
- Division-wise visits
- Multiple measurement teams
- Status tracking

## Measurement Module

- Fast mobile entry
- Auto sizing
- Custom size detection
- QR generation

## Production Workflow

- Size summaries
- Custom queue
- Workflow status tracking

## Packing Module

- QR verification
- Packed status updates

## Delivery Module

- Delivery tracking
- Pending / Delivered workflow

## Reports

- Production reports
- CSV export
- Packing summaries

---

# Folder Structure

```plaintext
frontend/
apps-script/
schema/
docs/
```

---

# Frontend Structure

```plaintext
frontend/

  pages/
  components/
  assets/
  utils/
```

---

# Apps Script Structure

```plaintext
apps-script/

  API.gs
  Routes.gs
  Config.gs
  Utils.gs

  Clients.gs
  Projects.gs
  Visits.gs
  Measurements.gs

  Production.gs
  Packing.gs
  Delivery.gs
```

---

# Required Google Sheets

- Users
- Clients
- Projects
- VisitSessions
- Measurements
- SizeRanges

---

# Deployment Flow

## Frontend

Hosted using:

- htmlhost.co

## Backend

Deploy Google Apps Script as:

- Web App

Required access:

- Anyone

---

# Current Development Status

## Completed

- Client management
- Project management
- Visit sessions
- Measurement workflow
- Packing workflow
- Delivery workflow
- Dashboard
- CSV reports
- QR-ready architecture

## In Progress

- PWA support
- Offline sync
- Sticker PDF generation
- Advanced production workflow

---

# Future Roadmap

- Barcode scanning
- RFID workflow
- Inventory integration
- Tailor assignment
- WhatsApp notifications
- Analytics dashboard
- Multi-branch operations

---

# Author

UniformFlow ERP
Operational Uniform Workflow System
