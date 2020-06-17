let typeApi = "http://localhost:8080/api/type/";
let categoryApi = "http://localhost:8080/api/category/";
let productApi = "http://localhost:8080/api/product/";
let productImagesApi = "http://localhost:8080/api/productimage";

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var byType = getParameterByName('type');
var byCategory = getParameterByName('category');

var qParam = '';
var endPoint = '';

if(byType != null){
    qParam = byType.toString();
    endPoint = "type/name?type=";
}

if(byCategory != null) {
    qParam = byCategory.toString();
    endPoint = "category/name?category=";
}

var products = new Vue({
    el: "#products",
    data: function(){
        return {
            products: [],
            images: [],
            tmp: []
        }
    },

    methods: {
        loadProducts: function () {
            this.products = [];
            axios({
                method: "get",
                url: productApi + endPoint + qParam
            })
                .then(response => {
                    this.products = response.data;
                    for(let i = 0; i < this.products.length; i++) {
                        //this.links.push("/dzial/" + this.types[i].name.toLocaleLowerCase().trim().replace(/ /g,"-"))
                    }
                }).catch(error => {
                console.log(error);
            });
        },

        loadImages: function(){
            axios({
                method: "get",
                url: productImagesApi + "/unique"
            })
                .then( response => {
                    this.images = response.data;


                    for(let i = 0; i < this.images.length; i++)
                        this.images[i]["image"] = "http://localhost/dashboard/images/datahub/" + this.images[i]["image"];

                }).
            catch( error => {
                console.log(error);
            });
        },
    },
    created: function () {
        this.loadProducts(this.products);
        this.loadImages(this.images);
    }
});
