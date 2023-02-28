<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link class="navbar-brand" to="/">LV-project</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="auth">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/category">Category</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/product/list">Product-List</router-link>
                    </li>
                    <li class="nav-item" v-if="auth">
                        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/auth/signup">Sign up</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        methods:{

        },
        computed:{
            auth(){
                return this.$store.getters.getAuthentcated;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
