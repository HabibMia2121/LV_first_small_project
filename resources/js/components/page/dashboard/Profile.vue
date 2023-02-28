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
                        User Profile
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="updateUserprofile()">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Your Name</label>
                                        <input type="text" class="form-control" v-model="userProfile.name" :class="{'is-invalid':userProfile.errors.has('name')}" placeholder="your name">
                                        <div v-if="userProfile.errors.has('name')" v-html="userProfile.errors.get('name')" class="text-danger" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Your Email</label>
                                        <input type="text" class="form-control" v-model="userProfile.email" :class="{'is-invalid':userProfile.errors.has('email')}" placeholder="your email">
                                        <div v-if="userProfile.errors.has('email')" v-html="userProfile.errors.get('email')" class="text-danger" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Password</label>
                                        <input type="password" class="form-control" v-model="userProfile.password" :class="{'is-invalid':userProfile.errors.has('password')}" placeholder="password">
                                        <div v-if="userProfile.errors.has('password')" v-html="userProfile.errors.get('password')" class="text-danger" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Confirm Password</label>
                                        <input type="password" class="form-control" v-model="userProfile.password_confirmation" :class="{'is-invalid':userProfile.errors.has('password_confirmation')}" placeholder="confirm password">
                                        <div v-if="userProfile.errors.has('password_confirmation')" v-html="userProfile.errors.get('password_confirmation')" class="text-danger" />
                                    </div>
                                </div>
                                <div class="form-group d-flex justify-content-end">
                                    <button class="btn btn-success mt-4 btn-sm">Save Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform';

    export default {
        data(){
            return{
                userProfile: new Form({
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                }),
            }
        },
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
                    this.$router.push({name:'login'});
                })
            },
            user(){
                let user = this.$store.getters.getUser;
                this.userProfile.name = user.name;
                this.userProfile.email = user.email;
            },
            updateUserprofile(){
                this.userProfile.post('/api/user').then(response => {
                    //user update on vuex store
                    this.$store.commit('SET_USER',response.data);
                    //toast notification message use here
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Profile update successfully'
                    })
                });
            }
        },
        created(){
            this.user();
        },
        // computed:{
        //     userNameUpdate(){
        //         return this.$store.getters.getUser;
        //     }
        // }
    }
</script>

<style lang="scss" scoped>

</style>
