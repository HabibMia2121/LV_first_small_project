<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Product List</h5>
                        <router-link class="btn btn-primary" to="/product/create">Create Product</router-link>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width:170px">ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Category Name</th>
                                    <th>Image</th>
                                    <th style="width:100px">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="products.length">
                                <tr v-for="(product,index) in products" :key="product.id">
                                    <td style="width:100px">{{index+1}}</td>
                                    <td>{{ product.title }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.description }}</td>
                                    <td>
                                        <span v-if="product.category">{{ product.category.name}}</span>
                                        <span v-else>{{ product.category.id}}</span>
                                    </td>
                                    <td>
                                        <div style="max-width:100px; max-height: 100px; overflow:hidden">
                                            <img :src="product.image" alt="not found" class="img-fluid">
                                        </div>
                                    </td>
                                    <td style="width:170px">
                                        <router-link :to="{name:'editProduct', params:{id:product.id}}" class="btn btn-primary btn-sm me-2">Edit</router-link>
                                        <a @click.prevent="deleteProduct(product)" href="" class="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4 mb-4">Product not found</h5>
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
                products:[],
            }
        },
        methods:{
            loadProducts(){
                axios.get('/api/product').then(response => {
                    this.products = response.data
                });
            },
            async deleteProduct(product){
                await axios.delete(`/api/product/${product.id}`).then(() => {
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
                        title: 'Product delete completed!'
                    })
                });

                let index = this.products.indexOf(product);
                this.products.splice(index, 1);

            },
        },
        mounted(){
            this.loadProducts();
        }
}

</script>
