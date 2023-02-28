<template>
    <div class="container mt-5" >
        <div class="row">
            <div class="col-md-4">
                <div class="list-group">
                    <router-link to="/dashboard" class="list-group-item list-group-item-action">Dashboard</router-link>
                    <router-link to="/user_profile" class="list-group-item list-group-item-action">User Profile</router-link>
                    <a href="#" class="list-group-item list-group-item-action" @click.prevent="logout">Logout</a>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Dashboard
                    </div>
                    <div class="card-body">
                        Welcome to {{ user.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        methods:{
            logout(){
                axios.post('/logout').then(response => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Logout successfully'
                    })

                    localStorage.removeItem("auth");
                    this.$store.commit('SET_AUTHENTCATED',false);
                    this.$router.push({name:'home'});
                })
            },

        },
        computed:{
            user(){
                return this.$store.getters.getUser;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
