<template>
    <div class="container">
         <div class="row justify-content-center">
             <div class="col-md-12">
                 <div class="card">
                     <div class="card-header d-flex justify-content-between align-items-center">
                         <h5 class="mb-0">Edit Product - {{ productForm.title }}</h5>
                         <router-link class="btn btn-primary" to="/product/list">Product List</router-link>
                     </div>
                     <div class="card-body">
                         <div class="row">
                             <div class="col-md-6 offset-3">
                                 <form @submit.prevent="updateProduct" enctype="multipart/form-data">
                                    <div class="form-group mb-3">
                                        <label for="">Product Title</label>
                                        <input type="text" v-model="productForm.title" name="title" class="form-control" :class="{'is-invalid':productForm.errors.has('title')}"  placeholder="product title">
                                        <div v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="">Price</label>
                                        <input type="text" v-model="productForm.price" name="price" class="form-control" :class="{'is-invalid':productForm.errors.has('price')}"  placeholder="product price">
                                        <div v-if="productForm.errors.has('price')" v-html="productForm.errors.get('price')" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="">Select Product Category</label>
                                        <select name="category" class="form-control"  id="" v-model="productForm.category_id" :class="{'is-invalid':productForm.errors.has('category_id')}">
                                            <option value="" style="display:none" selected>Select Category</option>
                                            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                        </select>
                                        <div v-if="productForm.errors.has('category_id')" v-html="productForm.errors.get('category_id')" class="text-danger" />
                                    </div>
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="form-group mb-3">
                                                <label for="">Image</label>
                                                <input type="file" name="image" class="form-control-plaintext" @change="onImageChange" :class="{'is-invalid':productForm.errors.has('image')}">
                                                <div v-if="productForm.errors.has('image')" v-html="productForm.errors.get('image')" class="text-danger" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="max-width:100px; max-height: 100px; overflow:hidden">
                                                <img :src="image" alt="not found" class="img-fluid">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="">Description</label>
                                        <textarea v-model="productForm.description" name="description" class="form-control" :class="{'is-invalid':productForm.errors.has('description')}"  placeholder="product description" rows="4"></textarea>
                                        <div v-if="productForm.errors.has('description')" v-html="productForm.errors.get('description')" class="text-danger" />
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
            productForm: new Form({
                title:'',
                price:'',
                image:'',
                description:'',
                _method:'put',
            }),
            image:'',
            categories:[],
        }),
        methods:{
            editpageloadeProduct(){
                let id = this.$route.params.id;
                axios.get(`/api/product/${id}/edit`).then(response => {
                    this.productForm.title = response.data.title;
                    this.productForm.price = response.data.price;
                    this.productForm.description = response.data.description;
                    this.productForm.category_id = response.data.category_id;
                    this.image = response.data.image;

                });
            },
            updateProduct(e){
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                let formData = new FormData();
                formData.append('image', this.image);

                let id = this.$route.params.id;
                this.productForm.post(`/api/product/${id}`,formData,config).then(response =>{

                    this.image=response.data.image;

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
                        title: 'Product update successfully'
                    })
                })

            },

            onImageChange(e){
                const file = e.target.files[0]
                this.productForm.image = file
            },
            async loadCategories(){
                await axios.get('/api/category').then(response => {
                    this.categories = response.data;
                });
            }
        },
        mounted() {
            this.editpageloadeProduct();
            this.loadCategories();
        },
    }
 </script>

 <style lang="scss" scoped>
 </style>
