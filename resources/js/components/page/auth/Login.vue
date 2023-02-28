<template>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-md-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="login()">
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="text" v-model="loginForm.email" class="form-control" :class="{'is-invalid':loginForm.errors.has('email')}" placeholder="email">
                                    <div v-if="loginForm.errors.has('email')" v-html="loginForm.errors.get('email')" class="text-danger" />
                                </div>
                                <div class="form-group pt-3">
                                    <label for="">Password</label>
                                    <input type="password" v-model="loginForm.password" class="form-control" :class="{'is-invalid':loginForm.errors.has('password')}" placeholder="password">
                                    <div v-if="loginForm.errors.has('password')" v-html="loginForm.errors.get('password')" class="text-danger" />
                                </div>
                                <div class="form-group pt-3">
                                    <button type="submit" class="btn btn-success px-4" :disabled="loginForm.busy"> Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Form from 'vform';

    export default {
        data:() => ({
            loginForm: new Form({
                email:'',
                password:''
            })
        }),
        methods:{
            async login(){
                await axios.get('/sanctum/csrf-cookie');
                await this.loginForm.post('/login');
                await this.getUserData();

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
                    title: 'Login successfully'
                })

                this.$router.push({name:'dashboard'});

            },
            async getUserData(){
                await axios.get('/api/user').then(response => {
                    let user = response.data;
                    this.$store.commit('SET_USER',user);
                    this.$store.commit('SET_AUTHENTCATED',true);
                    localStorage.setItem('auth',true);
                });
            }
        },
        mounted(){
            this.getUserData();
        }
    }
</script>

<style lang="scss" scoped>

</style>
