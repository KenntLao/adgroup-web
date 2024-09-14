<template>
    <div class="dashboard-container">
        <aside class="sidebar">
            <h2>Admin Panel</h2>
            <ul>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/ip-addresses">IP Addresses</router-link></li>
            <li><router-link to="/audit-log">Audit Log</router-link></li>
            <li><a href="#" @click="logout">Logout</a></li>
            </ul>
        </aside>
        <main class="content">
            <section class="main-content">
                <router-view></router-view>
            </section>
        </main>
    </div>
  </template>
  
<script>
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import axios from 'axios';

	export default {
		setup() {
			const router = useRouter();

			// Check if the user is logged in based on localStorage
			const isLoggedIn = computed(() => localStorage.getItem('authToken') !== null);

			const token = localStorage.getItem('authToken');
			
			if (!token) {
				throw new Error('No token found');
			}

			const logout = async () => {
			try {
				await axios.post('http://adgroup-api.test/api/auth/logout', {}, {
					headers: {
						'Authorization': `Bearer ${token}` // Include token in the Authorization header
					}
				});
				localStorage.removeItem('authToken'); // Remove token from localStorage
				router.push('/login'); // Redirect to login
			} catch (error) {
				console.error('Logout failed', error);
			}
			};

			return {
			isLoggedIn,
			logout,
			};
		}
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
  </style>