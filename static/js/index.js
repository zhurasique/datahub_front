let departmentApi = "http://localhost:8080/api/department";
let typeApi = "http://localhost:8080/api/type/";
let productApi = "/api/product";

let chosenDepartmentId = 3;
let departmentsId = [];

var departments = new Vue({
    el: "#departments",
    data: function(){
        return {
            departments: [],
            types: []
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
                    departmentsId = response.data;
                }).catch(error => {
                console.log(error);
            });

        }
    },
    created: function () {
        this.loadDepartments(this.departments);
    }
});

var types = new Vue({
    el: "#types",
    data: function(){
        return {
            types: []
        }
    },

    methods: {
        loadTypes: function () {
            this.types = [];
            axios({
                method: "get",
                url: typeApi + "filter/department/id?id=" + chosenDepartmentId
            })
                .then(response => {
                    this.types = response.data;
                }).catch(error => {
                console.log(error);
            });
        }
    },
    created: function () {
        this.loadTypes(this.types);
    }
});

document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function() {
        let departments = document.getElementsByName("department");

        let type = document.getElementById("type-bar");

        for (let i = 0; i < departments.length; i++) {
            departments[i].addEventListener('mouseover', function()  {
                chosenDepartmentId = departmentsId[i].id;
                types.loadTypes();
                type.style.display = "unset";
            }, false);
            departments[i].addEventListener('mouseout',  function() {
                typesCheckActive("type-bar");
            }, false);
        }

        function typesCheckActive(e) {
            let count = 0;
            let types = document.getElementById(e);

            types.addEventListener('mouseover', function()  {
                count++;
            }, false);
            types.addEventListener('mouseout',  function() {
                if(count > 0)
                    types.style.display = "none";
            }, false);
        }


    }, 100);
});