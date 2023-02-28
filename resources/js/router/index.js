import { createRouter,createWebHistory } from "vue-router";

// home page
import Home from "../components/page/Home.vue";
import ProductDetails from "../components/page/ProductDetails.vue";
// category page
import CategoryList from '../components/page/category/Index.vue';
import CreateCategory from '../components/page/category/Create.vue';
import EditCategory from '../components/page/category/Edit.vue';
// product page
import ProductList from '../components/page/product/ProductList.vue';
import ProductCreate from '../components/page/product/ProductCreate.vue';
import EditProduct from '../components/page/product/ProductEdit.vue';
// auth login page
import Login from '../components/page/auth/Login.vue';
import Signup from '../components/page/auth/Signup.vue';
// Dashboard page
import Dashboard from '../components/page/dashboard/Index.vue';
import UserProfile from '../components/page/dashboard/Profile.vue';

const routes=[
    {
        path:'/',
        component:Home,
        name:'home'
    },
    {
        path:'/category',
        component:CategoryList,
        name:'categoryList'
    },
    {
        path:'/category/create',
        component:CreateCategory,
        name:'createCategory'
    },
    {
        path:'/category/edit/:id',
        component:EditCategory,
        name:'editcategory'
    },
    {
        path:'/product/list',
        component:ProductList,
        name:'productList'
    },
    {
        path:'/product/create',
        component:ProductCreate,
        name:'productCreate'
    },
    {
        path:'/product/edit/:id',
        component:EditProduct,
        name:'editProduct'
    },
    {
        path:'/login',
        component:Login,
        name:'login',
        meta: { requiresVisitor: true },
    },
    {
        path:'/auth/signup',
        component:Signup,
        name:'signup',
        meta: { requiresVisitor: true },
    },
    {
        path:'/dashboard',
        component:Dashboard,
        name:'dashboard',
        meta: { requiresAuth: true },

    },
    {
        path:'/user_profile',
        component:UserProfile,
        name:'user_profile',
        meta: { requiresAuth: true },

    },
    {
        path:'/product/detail/:slug',
        component:ProductDetails,
        name:'productDetails',

    },
]


const router = createRouter({
    history:createWebHistory(),
    routes,
    linkExactActiveClass:'active',
});

export default router;
