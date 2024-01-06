import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
    data(){
        return{
            //api來源
            apiUrl: "https://ec-course-api.hexschool.io/v2",
            apiPath: "ryanchiang13",
            //儲存產品的空陣列
            products: [],
            //儲存單筆資料的空物件
            tempProduct: {},
        }
    },
    methods:{
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            //執行檢查通過之後就執行取得資料，失敗就回到登入頁面
            axios.post(url)
            .then(()=>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.response.data.message)
                window.location = "login.html";
            })
        },
        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
            .then((response)=>{
                this.products = response.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        openProduct(item){
            this.tempProduct = item;
        }
    },
    //檢查權限
    mounted(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkAdmin();
    }
}).mount("#app");