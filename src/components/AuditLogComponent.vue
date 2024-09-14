<template>
    <div class="audit-log-container">
        <header>
            <h1>Audit Logs</h1>
        </header>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div v-if="haveData">
            <table class="audit-log-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Event</th>
                        <th>Changes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="log in auditLogs" :key="log.id">
                        <td>{{ log.id }}</td>
                        <td class="event">{{ log.event }}</td>
                        <td>
                        <div v-for="(value, key) in parseJson(log.changes)" :key="key">
                            <strong>{{ key }}:</strong> {{ value }}
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
			<p>No Data Available</p>
		</div>

    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';

export default {
    setup() {
        const auditLogs = ref([]);
        const errorMessage = ref('');
        const haveData = ref(false);

        const fetchAuditLogs = async () => {
            try {
                const response = await axios.get('/audit-logs');
                auditLogs.value = response.data;
                haveData.value = Array.isArray(auditLogs.value) && auditLogs.value.length > 0;
            } catch (error) {
                errorMessage.value = 'Failed to fetch audit logs. Please try again later.';
                haveData.value = false;
            }
        };

        const parseJson = (jsonString) => {
            try {
                return JSON.parse(jsonString);
            } catch {
                return {};
            }
        };

        onMounted(() => {
            fetchAuditLogs();
        });

        return {
            auditLogs,
            errorMessage,
            parseJson,
            haveData
        };
    }
};
</script>
  
<style scoped>
    .audit-log-container {
        padding: 20px;
    }
    
    .error-message {
        color: red;
        margin-bottom: 20px;
    }
    
    .audit-log-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    
    .audit-log-table th, .audit-log-table td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    
    .audit-log-table th {
        font-weight: bold;
    }

    .event {
        text-transform: capitalize;
    }

    .audit-log-table td {
        word-break: break-word;
    }

</style>