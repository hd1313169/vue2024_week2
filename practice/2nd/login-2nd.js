import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({

    //資料
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
        }
    },

    //方法
    methods:{
        login(){
            //定義aip
            const api = "https://ec-course-api.hexschool.io/v2/admin/signin";
            //串接資料
            //傳入api和user資料
            axios.post(api, this.user)
            //取得token和期效
            .then((response)=>{
                const {token, expired} = response.data;
            //寫入 cookie
            document.cookie=`hexToken=${token}; expires=${new Date(expired)}; path=/`
            //跳轉頁面
            window.location = "products-2nd.html";
            })
            .catch((err)=>{
                alert(err.response.data.messege);
            });
        },
    },
}).mount("#app"); //生命週期