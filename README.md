# 📝 Notes App Frontend

A modern and collaborative web application for notes and notebooks management, built with React and Vite. Allows creating, editing, and sharing notebooks collaboratively in real-time.

## ✨ Features

- 📚 **Notebook Management**: Create and organize your notebooks intuitively
- 📝 **Notes Editor**: Edit your notes with a clean and modern interface
- 👥 **Real-Time Collaboration**: Share notebooks and work simultaneously with other users
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- 🔐 **Google Authentication**: Secure and simple login
- 🎨 **Modern Interface**: Attractive and functional design

## 🛠️ Technologies

- **React** - JavaScript library for building user interfaces
- **Vite** - Fast and modern build tool
- **Google OAuth** - Secure authentication
- **Responsive CSS** - Adaptable design for all devices

## 🚀 Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/inkih04/Notes-App-Frontend.git
   cd Notes-App-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the project root with the following variables:
   ```env
   VITE_GOOGLE_CLIENT_ID=
   VITE_API_URL=
   ```

4. **Run the application in development mode**
   ```bash
   ./run-dev.sh
   ```
   
   Or alternatively:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📱 Usage

### Main Features

1. **Login**
   - Use your Google account to access the application

2. **Notebook Management**
   - Create new notebooks
   - View all your existing notebooks
   - Organize your notes by categories

3. **Notes Editor**
   - Create and edit notes within your notebooks
   - Automatically save your changes
   - Intuitive and responsive interface

4. **Collaboration**
   - Share notebooks with other users
   - Work simultaneously on the same notebook
   - Real-time synchronization

## 🏗️ Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Main application pages
├── hooks/         # Custom hooks
├── services/      # Services for API communication
├── styles/        # Style files
└── utils/         # Utilities and helpers
```

## 🤝 Collaboration


## 📱 Responsive Design

The application is fully optimized for:
- 💻 **Desktop**: Complete experience with all functionalities
- 📱 **Mobile**: Interface adapted for touch screens
- 📊 **Tablet**: Hybrid design that takes advantage of available space

## 🌐 Demo and Links

### 🚀 Live Application
- **Demo**: [Notes App on Vercel](https://notes-app-frontend-vics-projects-668ba45c.vercel.app/)

### 🔗 Additional Links
- **Frontend**: [GitHub Repository](https://github.com/inkih04/Notes-App-Frontend)
- **Backend**: [API on Render](https://notes-app-backend-37a9.onrender.com)

### ⚠️ Performance Note

The application is deployed using **free tiers** of Vercel (frontend) and Render (backend), so:

- 🐌 **First access**: May take up to **1 minute** to load when there hasn't been recent activity
- ⏱️ **Performance**: Speed may be lower than optimal due to free plan limitations
- 😴 **Hibernation**: The backend on Render goes into hibernation mode after periods of inactivity

For an optimal experience, we recommend running the application locally following the installation instructions.

## 📄 License

This project is under the MIT license. Check the `LICENSE` file for more details.

## 🙋‍♂️ Support

If you have any questions or encounter any issues, feel free to open an issue on the GitHub repository.

---

**Developed with ❤️ using React and Vite**
