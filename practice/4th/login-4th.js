import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return{
            user:{
                username:'',
                password:'',
            },
        }
    },
    methods:{
        login(){
            const api = 'https://ec-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user)
            .then((res)=>{
                const {token, expired }= res.data;
                document.cookie = `hexToken${token}; expires=${new Date(expired)}; path=/`;
                window.location = 'products-4th.html';
            })
            .catch((err)=>{
                alert(err.res.data.message);
            });
        },
    },
}).mount('#app');