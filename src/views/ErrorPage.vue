/**
* Error Page
*/

<template>
    <div class="container h-100">
        <div class="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1>Error !!!</h1>
            <h2>You need to login to access this page</h2>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goLogin() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>