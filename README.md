# JeevaDhara Hospital Management Portal

JeevaDhara is a full-stack hospital administration web portal built using **Node.js**, **Express.js**, **MongoDB**, and basic HTML/CSS/JS. The system allows hospital administrators to efficiently manage real-time updates for **doctor availability**, **bed occupancy**, and **hospital status**, which are reflected dynamically across the user-facing display pages.

## 🌐 Live Modules

- **Apollo Hospital**
- **Yashoda Hospital**
- **KIMS Hospital**

## 📌 Features

- 🧑‍⚕️ **Doctor Scheduling**: Admins can update doctor availability and working hours per hospital.
- 🛏️ **Bed Availability**: Real-time updates on bed availability for each hospital branch.
- 💻 **Admin Dashboard**: Secure login page for hospital-specific administrators.
- 📊 **Dynamic Frontend Display**: Updates on doctor and bed info automatically reflected on the public-facing hospital pages.
- 🌍 **Multi-Hospital Support**: Extendable architecture supports new hospitals by adding relevant data files and routes.

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Backend     | Node.js, Express.js     |
| Frontend    | HTML, CSS, JavaScript   |
| Database    | MongoDB                 |
| UI Routing  | go.js                   |

## 📂 Project Structure

```
/project-root
├── public/
│   ├── apollo.html
│   ├── yashoda.html
│   ├── kims.html
│   ├── login.html
│   └── go.js
├── routes/
│   ├── apolloRoutes.js
│   ├── yashodaRoutes.js
│   └── kimsRoutes.js
├── models/
│   └── hospital.js
├── server.js
├── package.json
└── README.md
```

## 🔐 Admin Functionality

Each hospital has its own admin login. Once authenticated, the admin can:

- View the list of doctors and edit their availability.
- Update the number of available beds.
- The frontend display is automatically updated with these changes via API calls.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jeevadhara-hospital-portal.git
cd jeevadhara-hospital-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file and define the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jeevadhara
```

### 4. Start the Server

```bash
node server.js
```

Access the portal at [http://localhost:3000](http://localhost:3000)

## 🧩 Adding a New Hospital

1. Create a new `.html` file in `public/`.
2. Add a new route in `routes/`.
3. Update `go.js` for routing logic.
4. Extend the MongoDB schema or create a new collection.

## 🤝 Contributors

- Uday Kiran – Full Stack Developer
- Pranavi – Full Stack Developer
- Sharanya – Full Stack Developer

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.