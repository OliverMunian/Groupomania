<template>
  <div class="afficher">
    <h1> Bonjour {{user.prenom}}</h1>
    <div class="button">
      <button @click="remove(user)"> supprimer mon profil</button>
    </div>
    <User/>
    <br/>
    <h1>Vos post récents</h1>
     <MyPost/>
  </div>
</template>


<script>
import axios  from 'axios'
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
    remove(){
    axios.delete("http://localhost:8082/api/auth/delete", { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
      .then(() => {
        alert('votre profil a bien été supprimé')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('utilisateur')
        this.connected = false 
        this.$router.push("/Connexion");  
      })
      .catch((error) => {
        console.log(error);
      });
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
  justify-content: center;
  align-items: center;
}

.button{
  position: relative;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
