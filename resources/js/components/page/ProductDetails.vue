<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2>{{ product.title }}</h2>
                    </div>
                    <div class="card-body">
                        <div class="">
                            <img :src="product.image" class="card-img-top" style="height:200px; overflow:hidden; object-fit:cover;" alt="not found">
                        </div>
                        <div class="mt-3">
                            <label class="badge bg-danger mb-3">{{category.name}}</label>
                            <h3>${{ product.price }}</h3>
                        </div>
                        <div class="mt-2">
                            {{ product.description }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <router-link :to="{name:'home'}" class="btn btn-primary">Go to Home</router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return {
                product:[],
                category:[],
            }
        },
        methods:{
            async loadProductData(){
                let slug = this.$route.params.slug;
                let {data} = await axios.get('/api/products/'+slug);
                this.product = data;
                this.category = data.category;
            },
        },
        mounted(){
            this.loadProductData();
        }

    }
</script>
