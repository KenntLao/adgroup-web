<!-- src/components/Dashboard.vue -->
<template>
    <div class="dashboard-container">
      <aside class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#users">Users</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#logout" @click="logout">Logout</a></li>
        </ul>
      </aside>
      <main class="content">
        <header class="header">
          <h1>Dashboard</h1>
        </header>
        <section class="main-content">
          <div class="card">
            <h3>Welcome to the Admin Dashboard</h3>
            <p>This is your main area where you can manage your application.</p>
          </div>
          <!-- Additional components can be added here -->
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const logout = () => {
        // Clear authentication token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      };
  
      return {
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
  }
  
  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: #fff;
    height: 100vh;
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar h2 {
    margin-bottom: 1rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 0.5rem;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  .sidebar ul li a:hover {
    text-decoration: underline;
  }
  
  .content {
    flex: 1;
    padding: 1rem;
  }
  
  .header {
    background-color: #ecf0f1;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }
  
  .main-content {
    margin-top: 1rem;
  }
  
  .card {
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>