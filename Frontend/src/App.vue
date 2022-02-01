<template>
  <div id="nav">
    <img class="img-logo" src="./assets/monochrome-white.png" alt="logo">
    <div class="navigation">
      <router-link  v-if="!connected" class="button"   to="/">Accueil</router-link>
      <router-link v-if="!connected" class="button"  to="/Connexion">Connexion</router-link>
      <router-link  v-if="!connected" class="button" to="/Inscription">Inscription</router-link> 
      <router-link  v-if="connected" class="button"  to="/Home">Home</router-link> 
      <router-link  v-if="connected" class="button"  to="/Profil">Profil</router-link> 
      <button v-if="connected" v-on:click="disconnect()"> Deconnexion </button>
    </div>
  </div>
  <router-view></router-view >
</template>


<script>
export default {
  data(){
    return{
      connected: true,
    }
  },
  methods:{
    disconnect(){
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('isAdmin',)
      this.$router.push('/')
      this.connected = false
    },
    remove(){
      this.connected = false
    },
    checkAccount(){
      if(window.localStorage.getItem('token')!= null){
        this.connected = true
        return true;
      }
      else{
        this.connected = false
        return false;
      }
    },
  },
    mounted(){
      this.checkAccount();
      this.$router.beforeEach((to, from, next)=>{
        switch(to.name){
          case 'Profil':
          case 'Home': 
            if(this.checkAccount()==false ){
              alert('Vous n\'êtes pas connecté')
              next({name: 'Connexion'})
            }
            else{
              next();
            }
          break;
          default:
          next();
        }
      })
  },
}
</script>


<style>

body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: #083E73;
}

#nav a {
  margin-left: 20px;
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #EB4426;
}

.img-logo{
  width: 10%;
}

button{
  margin-left: 20px;
  color: black;
  border-radius: 5px;
}

button:hover{
  background-color: #EB4426;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

@media screen and (max-width: 450px){
    #nav a {
        font-size: 12px;
        margin-left: 8px;
    }
    #nav{
      flex-direction: column;
    }
    .img-logo{
      width: 40%;
    }
    .navigation{
      right: 30px;
    }
    .bonjour{
      width: 70%;
    }
}

</style>
