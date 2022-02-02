<template>
  <div class="afficher">
    <h1> Bonjour {{user.prenom}}</h1>
    <div class="button">
      <button @click="modify()"> modifier mon profil</button>
    </div>
    <User/>
    <br/>
    <h1>Vos post récents</h1>
     <MyPost/>
  </div>
</template>


<script>

import User from '@/components/User.vue'
import MyPost from '@/components/MyPost.vue'

export default {
  name:'Profil',
  components:{
    MyPost,
    User,
  },
  data(){
    return{
      user: "",
    };
  },
  methods:{
    modify(){
        this.$router.push("/ChangeProfile");  
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
}
</script>

<style scoped>

.afficher {
  background-color: #80808014;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button{
  position: absolute;
  right: 0;
}
</style>
