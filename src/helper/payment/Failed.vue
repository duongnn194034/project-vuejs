<template>
    <div class="text-center">
        <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Đang tải...</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'FailedPayment',
    mounted(){
        localStorage.removeItem("sessionId")
        window.location.href = '/offer'
    }
}
</script>