<template>
  <div class="loader"></div>
</template>
<script>
export default {
  name: 'Loader'
}
</script>
<style scoped>
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: relative;
    margin: 20px calc(50% - 60px) 40px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>