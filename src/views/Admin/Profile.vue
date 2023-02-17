<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">User Profile</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
                <div class="col-md-6 px-5 px-md-0">
                    <form>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="categoryName" required>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" v-model="description" required>
                        </div>
                        <div class="form-group">
                            <label>Phonenumber</label>
                            <input type="url" class="form-control" v-model="imageUrl" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="url" class="form-control" v-model="imageUrl" required>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input type="url" class="form-control" v-model="imageUrl" required>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveChanged">Save changed</button>
                    </form>
                </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>