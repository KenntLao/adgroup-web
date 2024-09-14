<template>
	<div class="ip-address-container">
		<header>
			<h1>IP Addresses</h1>
			<button @click="openAddIPModal" class="add-ip-btn">Add IP Address</button>
		</header>
		
		<div v-if="haveData">
			<table class="ip-address-table">
				<thead>
				<tr>
					<th>ID</th>
					<th>IP Address</th>
					<th>Label</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="ip in ipAddresses" :key="ip.id">
					<td>{{ ip.id }}</td>
					<td>{{ ip.ip_address }}</td>
					<td>{{ ip.label }}</td>
					<td>
						<button @click="editIP(ip)">Edit</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>

		<div v-else>
			<p>No Data Available</p>
		</div>

		<div v-if="showModal" class="modal">
			<div class="modal-content">
				<h2>{{ editingIP ? 'Edit IP Address' : 'Add IP Address' }}</h2>
				<form @submit.prevent="saveIP">
					<label v-if="!editingIP" for="ip_address">IP Address</label>
					<input v-if="!editingIP" v-model="ipForm.ip_address" type="text" id="ip_address" required>

					<label v-if="editingIP" for="label">Label</label>
					<input v-if="editingIP" v-model="ipForm.label" type="text" id="label" required>

					<div class="button-container">
						<button class="mr-15" @click="closeModal">Close</button>
						<button type="submit">{{ editingIP ? 'Save Changes' : 'Add IP' }}</button>
					</div>

					<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
				</form>
				
			</div>
		</div>
	</div>

</template>
  
<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';

export default {
	setup() {
		const ipAddresses = ref([]);
		const showModal = ref(false);
		const editingIP = ref(false);
		const ipForm = ref({ id: null, ip_address: '', label: '' });
		const errorMessage = ref('');
		const haveData = ref(false);

		const fetchIPAddresses = async () => {
			try {
				const response = await axios.get('/ip-address');
				ipAddresses.value = response.data;

				haveData.value = Array.isArray(ipAddresses.value) && ipAddresses.value.length > 0;

			} catch (error) {
				console.error('Failed to fetch IP addresses', error);
				haveData.value = false;
			}
		};

		const openAddIPModal = () => {
			showModal.value = true;
			editingIP.value = false;
			ipForm.value = { id: null, ip_address: '', label: '' };
		};

		const editIP = (ip) => {
			showModal.value = true;
			editingIP.value = true;
			ipForm.value = { ...ip };
		};

		const saveIP = async () => {
			try {
				if (editingIP.value) {
					await axios.patch(`/ip-address/${ipForm.value.id}`, ipForm.value);
				} else {
					await axios.post('/ip-address', ipForm.value);
				}
				
			} catch (error) {
				errorMessage.value = `Error: ${error.response.data.message || 'Invalid Data.'}`;
			}

			if (errorMessage.value == '') {
				closeModal();
				fetchIPAddresses();
			}
		};

		const closeModal = () => {
			showModal.value = false;
		};

		onMounted(fetchIPAddresses);

		return {
			ipAddresses,
			showModal,
			ipForm,
			editingIP,
			openAddIPModal,
			editIP,
			saveIP,
			closeModal,
			errorMessage,
			haveData
		};
	},
};
</script>
  
<style scoped>
	.mr-15 {
		margin-right: 15px;
	}
	.ip-address-container {
		padding: 20px;
	}

	.add-ip-btn {
		float: right;
		margin-bottom: 10px;
	}

	.ip-address-table {
		width: 100%;
		border-collapse: collapse;
	}

	.ip-address-table th, .ip-address-table td {
		padding: 10px;
		border: 1px solid #ccc;
		text-align: left;
	}

	.ip-address-table button {
		background: #28a745;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button-container {
		width: 100%;
		margin-top: 15px;
	}
	

	.modal-content {
		text-align: left;
		background: white;
		padding: 20px;
		border-radius: 8px;
	}

	.modal-content label {
		margin-bottom: 5px;
		font-size: 1rem;
	}

	.modal-content input {
		width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
	}

	button {
		padding: 10px 15px;
		background-color: #007bff;
		color: white;
		border: none;
        border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.error-message {
        color: #e74c3c;
        margin-top: 1rem;
        text-align: center;
    }
	
</style>