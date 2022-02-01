<template>
  <img alt="Vue logo" src="../assets/icon-above-font.png">
  <h1>Veuillez vous inscrire pour accéder au contenu</h1>
  <div class="bonjour">
      <p class="text"> {{ message }} </p>
      <form @submit="connect">
          <input v-model="nom" class="input" id="nom" type="text" placeholder="Nom">
          <input v-model="prenom" class="input"  id="prenom" type="text" placeholder="Prenom">
          <input v-model="user" class="input"  id="email" type="email" placeholder="Adresse mail">
          <input v-model="password" class="input"  id="password" type="password" placeholder="Mot de passe">
          <button type="submit" class="submit"> Souscription </button>
      </form>
  </div>
  <router-view></router-view>
</template>


<script>
export default {
  name: "Inscription",
  data() {
        return{
            message: 'Pour vous connecter, veuillez compléter les champs',
            nom:'',
            prenom:'',
            user:'',
            password:'',
            /*userError : false,*/
        }

  },
  methods: {
    connect(e) {
      function capitalizeString(){
        const prenom = document.getElementById('prenom')
        const prenomValeur =  prenom.value
        const nom = document.getElementById('nom')
        const nomValeur =  nom.value

        prenom.innerHTML = prenomValeur.charAt(0).toUpperCase()
        nom.innerHTML = nomValeur.charAt(0).toUpperCase()
      }
      e.preventDefault();
      if (this.user == "" || this.password == "") {
        alert("veuillez completer tous les champs");
      }
      else{
        let myheader  =  new Headers({
          "Content-Type": 'application/json'
        })
        fetch("http://localhost:8082/api/auth/signup",{
          method: 'POST',
          headers: myheader,
          body : JSON.stringify({
            nom: this.nom,
            prenom: this.prenom,
            email:  this.user,
            password: this.password
          })
        })
        .then(function(response){
          return response.json();
        }).then(()=>{
          capitalizeString();
          alert("Votre profil a bien été créer")
          window.localStorage.setItem('utilisateur', this.prenom)
          this.$router.push('/Connexion')
        })
        .catch(() => { this.userError = true })
      }
    },
  },//methods
  }//export default

</script>
  

<style scoped>
img{
  height: 220px;
  margin-top: 20px;
}
.bonjour{
    border: 2px solid #EB4426;
    background-color: #083E73;
    margin-top: 50px;
    margin-left: 50%;
    padding: 30px;
    width: 50%;
    transform: translateX(-50%);
}

.text{
    color: white;
}

form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

div input{
    margin-bottom: 10px;
    width: 35%;
}

button{
    width: 15%;
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
      width: 30%;
    }
    .navigation{
      right: 30px;
    }
    .bonjour{
      width: 70%;
    }
    .input{
      width: 65%;
    }
}

@media screen and (max-width: 700px){
  .submit{
    width: 35%;
    margin: 0;
  }
}
</style>