let departmentApi = "http://localhost:8080/api/department";
let typeApi = "/api/type";
let productApi = "/api/product";

var vue = new Vue({
    el: "#departments",
    data: function(){
        return {
            departments: []
        }
    },

    methods: {
        loadDepartments: function () {
            axios({
                method: "get",
                url: departmentApi
            })
                .then(response => {
                    this.departments = response.data;
                }).catch(error => {
                console.log(error);
            });

        },
    },
    created: function () {
        this.loadDepartments(this.departments);
    }
});

document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function() {
        let departments = document.getElementsByName("department");

        let types = document.getElementById("type-bar");

        for (let i = 0; i < departments.length; i++) {
            departments[i].addEventListener('mouseover', function()  {
                types.style.display = "unset";
            }, false);
            departments[i].addEventListener('mouseout',  function() {
                types.style.display = "none";
            }, false);
        }
    }, 100);
});