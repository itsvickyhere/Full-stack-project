# 🌍 Online Donation Platform

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CORS Enabled](https://img.shields.io/badge/Integration-CORS-orange)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[![Made with ❤️ by Vignesh](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20by%20Vignesh-red)](https://github.com/your-username)

---

An online platform where **NGOs can post causes** and **donors can contribute** to meaningful initiatives.  
Developed using **React (Frontend)** and **Spring Boot (Backend)** with **CORS integration** for seamless data flow.

---

## ✨ Features

- 🏢 **NGO Management** – NGOs can register, log in, and post causes.  
- 💰 **Donation System** – Donors can browse and contribute to verified causes.  
- 🧾 **Cause Tracking** – Track active, completed, and funded donations.  
- 🔐 **Secure Authentication** – JWT-based login for NGOs and donors.  
- 🌐 **Cross-Origin Integration** – Smooth communication between frontend and backend.  
- 📸 **Media Uploads** – Upload images to showcase causes.  
- 📊 **Dashboard** – NGOs and donors can view impact analytics.

---

## 🧩 Tech Stack

### 💻 Frontend
- React.js (Hooks + Context API)
- Axios (API communication)
- React Router DOM
- Material UI / Custom CSS

### ⚙️ Backend
- Spring Boot (RESTful APIs)
- Spring Data JPA + Hibernate
- MySQL / PostgreSQL
- Configured CORS for full-stack connectivity

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-donation-platform.git
cd online-donation-platform
````

### 2️⃣ Backend Setup (Spring Boot)

1. Open the `backend/` folder in **IntelliJ IDEA** or **Eclipse**.
2. Update `application.properties` with your database credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/donation_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Run the backend server:

   ```bash
   mvn spring-boot:run
   ```

   or start directly from your IDE.

### 3️⃣ Frontend Setup (React)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```
4. Open your browser at [http://localhost:3000](http://localhost:3000)
   Backend runs at [http://localhost:8080](http://localhost:8080)

---

## 🖼️ Screenshots

| Home Page                                | Cause Page                                 | Donation Summary                               |
| ---------------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| ![Home Screenshot](screenshots/home.png) | ![Cause Screenshot](screenshots/cause.png) | ![Summary Screenshot](screenshots/summary.png) |

> 📸 Add your actual screenshots inside a `/screenshots` folder at the root of your repository.

---

## 📂 Project Structure

```
Full-stack-project-master/
│
├── backend/                # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── screenshots/            # App screenshots
└── README.md               # This file
```

---

## 🔗 API Endpoints

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| `POST` | `/api/auth/register` | Register new NGO or donor |
| `POST` | `/api/auth/login`    | User authentication       |
| `GET`  | `/api/causes`        | Fetch all causes          |
| `POST` | `/api/causes`        | Create new cause          |
| `POST` | `/api/donate/{id}`   | Donate to a cause         |

---

## 🧠 Future Enhancements

* 💳 Integrate **Razorpay / Stripe** for real payments
* 📱 Fully responsive PWA design
* 🔔 Email & SMS notifications for donations
* ✅ NGO verification using registry APIs
* 🌍 Multi-language and region support

---

## 👨‍💻 Author

**Vignesh B.S**
III Year, B.E. CSE
Sri Krishna College of Technology, Coimbatore
📫 *Contributions and feedback are always welcome!*

---

## 🪪 License

This project is open-source and available under the **MIT License**.

---

⭐ **If you found this project helpful, give it a star on GitHub and share it!**


**Screenshots**

<img width="1919" height="926" alt="Screenshot 2025-08-18 213603" src="https://github.com/user-attachments/assets/d6f92592-5b40-416b-9754-dd1b63766464" />
<img width="1918" height="927" alt="Screenshot 2025-08-18 214003" src="https://github.com/user-attachments/assets/9df78497-eeb3-41a5-b7c0-b9d5b2ac6ccf" />

<img width="1919" height="927" alt="Screenshot 2025-08-18 213751" src="https://github.com/user-attachments/assets/7e16bacc-886a-45c7-a93a-cce34d93c786" />
<img width="1919" height="928" alt="Screenshot 2025-08-18 213848" src="https://github.com/user-attachments/assets/9580a73b-b9ff-4548-9d25-350861b55d61" />
<img width="1918" height="758" alt="Screenshot 2025-08-19 004507" src="https://github.com/user-attachments/assets/2ed12722-aa47-456a-975d-844fbd2605d6" />

---
