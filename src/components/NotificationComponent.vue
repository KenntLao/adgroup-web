<template>
    <div v-if="message" :class="`notification ${type}`" @click="hideNotification">
        {{ message }}
    </div>
</template>
  
<script>

export default {
    props: {
        message: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'success'
        }
    },
    setup(props) {
        const hideNotification = () => {
            emit('clear');
        };
    
        return {
            hideNotification
        };
    }
};
</script>
  
<style scoped>
    .notification {
        position: fixed;
        top: 1rem;
        right: 1rem;
        padding: 1rem;
        border-radius: 4px;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        z-index: 1000;
    }

    .notification.success {
        background-color: #28a745;
    }

    .notification.error {
        background-color: #dc3545;
    }
</style>