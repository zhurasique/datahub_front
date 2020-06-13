let departmentName = "Motoryzacja";
let typeApi = "http://localhost:8080/api/type/";
let categoryApi = "http://localhost:8080/api/category/";

var types = new Vue({
    el: "#types",
    data: function(){
        return {
            types: [],
            categories: [],
            images: [],
            departmentName: departmentName
        }
    },

    methods: {
        loadTypes: function () {
            this.types = [];
            axios({
                method: "get",
                url: typeApi + "department/name?department=" + departmentName
            })
                .then(response => {
                    this.types = response.data;
                    for(let i = 0; i < this.types.length; i++) {
                        this.images.push("./static/img/" + this.types[i].name.toLocaleLowerCase().trim().replace(/ /g,"-") + ".jpg");
                        //this.links.push("/dzial/" + this.types[i].name.toLocaleLowerCase().trim().replace(/ /g,"-"))
                    }
                }).catch(error => {
                console.log(error);
            });
        },
        loadCategories: function () {
            this.categories = [];
            axios({
                method: "get",
                url: categoryApi
            })
                .then(response => {
                    this.categories = response.data;
                }).catch(error => {
                console.log(error);
            });
        }
    },
    created: function () {
        this.loadTypes(this.types);
        this.loadCategories(this.categories);
    }
});
