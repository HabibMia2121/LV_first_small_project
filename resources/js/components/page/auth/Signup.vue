<template>
    <div class="container">
        <div class="py-5">
            <div class="row">
                <div class="col-md-6 offset-3">
                    <div class="card card-default">
                        <div class="card-header">
                            Sign Up
                        </div>
                        <div class="card-body">
                            <form action="" method="post" @submit.prevent="createUser()">
                                <div class="form-group">
                                    <label for="">Name</label>
                                    <input type="text" v-model="signupForm.name" class="form-control" :class="{'is-invalid':signupForm.errors.has('name')}" placeholder="email">
                                    <div v-if="signupForm.errors.has('name')" v-html="signupForm.errors.get('name')" class="text-danger" />
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="text" v-model="signupForm.email" class="form-control" :class="{'is-invalid':signupForm.errors.has('email')}" placeholder="email">
                                    <div v-if="signupForm.errors.has('email')" v-html="signupForm.errors.get('email')" class="text-danger" />
                                </div>
                                <div class="form-group pt-3">
                                    <label for="">Password</label>
                                    <input type="password" v-model="signupForm.password" class="form-control" :class="{'is-invalid':signupForm.errors.has('password')}" placeholder="password">
                                    <div v-if="signupForm.errors.has('password')" v-html="signupForm.errors.get('password')" class="text-danger" />
                                </div>
                                <div class="form-group pt-3">
                                    <label for="">Confirm Password</label>
                                    <input type="password" v-model="signupForm.password_confirmation" class="form-control" :class="{'is-invalid':signupForm.errors.has('password_confirmation')}" placeholder="confirm password">
                                    <div v-if="signupForm.errors.has('password_confirmation')" v-html="signupForm.errors.get('password_confirmation')" class="text-danger" />
                                </div>
                                <div class="form-group pt-3">
                                    <button type="submit" class="btn btn-success px-4"> Create Account</button>
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
            signupForm: new Form({
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
            })
        }),
        methods:{
            async createUser(){
                await axios.get('/sanctum/csrf-cookie');

                await this.signupForm.post('/register');

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
                    title: 'Your account has been created!'
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
            },
        },
        mounted(){
        }
    }
</script>

<style lang="scss" scoped>

</style>
