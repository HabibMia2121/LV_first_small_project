<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function products()
    {
        $products = Product::with('category')->latest()->paginate(5);
        return response()->json($products,200);
    }
    public function productDetails($slug)
    {
        $product = Product::with('category')->where('slug',$slug)->first();
        if($product){
            return response()->json($product,200);
        }
        else{
            return response()->json('Not found',404);
        }
    }
}
