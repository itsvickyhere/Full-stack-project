# 🌍 Online Donation Platform

An online platform where **NGOs can post causes** and **donors can contribute** to meaningful initiatives.  
Built using **React (Frontend)** and **Spring Boot (Backend)**, seamlessly connected via **CORS**.

---

## ✨ Features

- 🏢 **NGO Management** – NGOs can register, authenticate, and post causes.
- 💰 **Donation System** – Donors can browse and contribute to verified causes.
- 🧾 **Cause Tracking** – Track ongoing and completed donations.
- 🔐 **Secure Authentication** – JWT-based login and session handling.
- 🌐 **Cross-Origin Integration** – React and Spring Boot communication using CORS.
- 📸 **Media Uploads** – Causes can include images to improve trust.
- 📊 **Dashboard** – Donors and NGOs can view summaries and donation analytics.

---

## 🧩 Tech Stack

### 💻 Frontend
- React.js (with Hooks and Context API)
- Axios for API handling
- React Router for navigation
- Material UI / Custom CSS for UI styling

### ⚙️ Backend
- Spring Boot (RESTful API)
- Spring Data JPA + Hibernate
- MySQL / PostgreSQL
- Configured CORS for frontend-backend connection

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/online-donation-platform.git
cd online-donation-platform
````

### 2️⃣ Backend Setup (Spring Boot)

1. Open the `backend/` folder in **IntelliJ IDEA** or **Eclipse**.
2. Update your `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/donation_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Run the backend:

   ```bash
   mvn spring-boot:run
   ```

   or run directly from your IDE.

### 3️⃣ Frontend Setup (React)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
   Backend runs on [http://localhost:8080](http://localhost:8080).

---

## 🖼️ Screenshots

| Home Page                                | Cause Page                                 | Donation Summary                               |
| ---------------------------------------- | ------------------------------------------ | ---------------------------------------------- |
| ![Home Screenshot](screenshots/home.png) | ![Cause Screenshot](screenshots/cause.png) | ![Summary Screenshot](screenshots/summary.png) |

> 📸 Place your screenshots in a folder named `/screenshots` at the root of your repository.

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
├── screenshots/            # Screenshots for README
└── README.md               # This file
```

---

## 🔗 API Endpoints

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register a new NGO or donor |
| `POST` | `/api/auth/login`    | Authenticate user           |
| `GET`  | `/api/causes`        | Get all causes              |
| `POST` | `/api/causes`        | Create a new cause          |
| `POST` | `/api/donate/{id}`   | Donate to a cause           |

---

## 🧠 Future Enhancements

* 💳 Integrate Razorpay / Stripe for payment processing
* 📱 Responsive mobile design with PWA support
* 🔔 Notification and email alerts for donations
* 🧩 NGO verification through government registry APIs

---

## 👨‍💻 Author

**Vignesh B.S**
III Year, B.E. CSE
Sri Krishna College of Technology, Coimbatore
📫 *Contributions and feedback are welcome!*

---

## 🪪 License

This project is open-source and available under the **MIT License**.

---

⭐ **If you found this project useful, give it a star on GitHub!**

```

---

Would you like me to include **badges** (React, Spring Boot, MySQL, MIT License, etc.) at the top for a more **professional GitHub header** look?  
It’ll make the README stand out visually.
```
