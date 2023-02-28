<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Product Category</h5>
                        <router-link class="btn btn-primary" to="/category/create">Create Cateagory</router-link>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width:170px">ID</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th style="width:100px">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="categories.length">
                                <tr v-for="(category,index) in categories" :key="category.id">
                                    <td style="width:100px">{{index+1}}</td>
                                    <td>{{ category.name }}</td>
                                    <td>{{ category.slug }}</td>
                                    <td style="width:170px">
                                        <router-link :to="{name:'editcategory', params:{id:category.id}}" class="btn btn-primary btn-sm me-2">Edit</router-link>
                                        <a @click.prevent="deleteCategory(category)" href="" class="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4 mb-4">Category not found</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

   export default {
        data:() => {
            return{
                categories:[],
            }
        },
        methods:{
            loadCategories(){
                axios.get('/api/category').then(response => {
                    this.categories = response.data
                });
            },
            deleteCategory(category){
                axios.delete(`/api/category/${category.id}`).then(() => {
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
                        title: 'Category delete completed!'
                    })
                });

                let index = this.categories.indexOf(category);
                this.categories.splice(index, 1);

            },
        },
        mounted(){
            this.loadCategories();
        }

   }

</script>
