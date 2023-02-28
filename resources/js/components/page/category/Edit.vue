<template>
    <div class="container">
         <div class="row justify-content-center">
             <div class="col-md-12">
                 <div class="card">
                     <div class="card-header d-flex justify-content-between align-items-center">
                         <h5 class="mb-0">Edit Category - {{ categoryForm.name }}</h5>
                         <router-link class="btn btn-primary" to="/category">Cateagory List</router-link>
                     </div>
                     <div class="card-body">
                         <div class="row">
                             <div class="col-md-6 offset-3">
                                 <form @submit.prevent="updateCategory">
                                     <div class="form-group mb-3">
                                         <label for="">Category Name</label>
                                         <input type="text" v-model="categoryForm.name" name="name" class="form-control" :class="{'is-invalid':categoryForm.errors.has('name')}"  placeholder="category name">
                                         <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" class="text-danger" />
                                     </div>
                                     <div class="form-group">
                                         <button type="submit" class="btn btn-success">Update</button>
                                     </div>
                                 </form>
                             </div>
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
            categoryForm: new Form({
                name: '',
            }),
        }),
        methods:{
            updateCategory(){
                let id = this.$route.params.id;

                this.categoryForm.put(`/api/category/${id}`).then( () =>{

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
                        title: 'Category update successfully'
                    })
               })
            },
            loadCategory(){
                let id = this.$route.params.id;
                axios.get(`/api/category/${id}/edit`).then(response =>{
                    this.categoryForm.name = response.data.name;
                });
            }
        },
        mounted(){
            this.loadCategory();
        }

    }
</script>

<style lang="scss" scoped>

</style>
