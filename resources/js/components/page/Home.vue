<template>
    <div class="container">
        <h2>Our Products</h2>
        <div class="row" v-if="apiCallLoaded">
            <div class="col-md-3" v-for="product in products" :key="product.id">
                <div class="card mt-4">
                    <img :src="product.image" class="card-img-top" style="height:150px; overflow:hidden; object-fit:cover;" alt="not found">
                    <div class="card-body">
                        <div class="mb-2 d-flex justify-content-between">
                            <span class="badge bg-danger mb-3">{{ product.category.name }}</span>
                            <h5 class="card-title">${{ product.price }}</h5>
                        </div>
                        <h4 class="card-title ">{{ product.title }}</h4>
                        <p class="card-text">{{subStr(product.description)}}</p>
                        <routerLink :to="{ name: 'productDetails', params:{slug:product.slug}}" class="btn btn-primary">View Product</routerLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4 mb-4" v-if="apiCallLoaded">
            <button class="btn btn-primary"  @click="loadMoreProduct(next_page_url)" :disabled="!next_page_url" >
            More..</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return {
                products:[],
                next_page_url:null,
                apiCallLoaded:false,
            }
        },
        methods:{
            async loadProduct(){
                let {data} = await axios.get('/api/products/');
                this.products = data.data;
                this.next_page_url = data.next_page_url;
                this.apiCallLoaded = true;
            },
            async loadMoreProduct(url){
                let {data} = await axios.get(url);
                let products = data.data;
                products.forEach(element => {
                    this.products.push(element);
                });
                this.next_page_url = data.next_page_url;
            },
            // substr(),This method is used to extract the characters from a string
            subStr(string){
                return string.substring(0,50) + '...';
            },
        },
        mounted(){
            this.loadProduct();
        }

    }
</script>
