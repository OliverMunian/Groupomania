<template>
  <img alt="Vue logo" src="../assets/icon.png">
    <div class="bonjour">
        <p class="text"> {{ message }} </p>
        <p class="text" v-if="userError">Ce compte n'existe pas !</p>
        <form @submit.prevent="connect">
            <input v-model="user" id="email" type="email" placeholder="Veuillez entrez votre adresse mail">
            <input v-model="password" id="password" type="password" placeholder="Veuillez entrez votre mot de passe">
            <button type="submit" class="submit"> Connexion </button>
        </form>
        <br/>
        <span class="target" @click="goToInscription">Vous n'avez pas encore de compte ? cliquez ici</span>
    </div>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'Connexion',
    data(){
        return{
        message: 'Pour vous connecter, veuillez compléter les champs',
        user:'',
        password:'',
        userError : false,
        }
    },
    methods:{
        connect(){ 
            if(this.user == '' || this.password == ''){
                alert('L\'un des deux champs est incorrect');
            }
            else{ 
                this.userError = false
                let myheader  =  new Headers({
                    "Content-Type": 'application/json'
                })
                fetch("http://localhost:8082/api/auth/login",{
                    method: 'POST',
                    headers: myheader,
                    body : JSON.stringify({
                        email:  this.user,
                        password: this.password
                    })
                })
                .then(function(response){
                    return response.json();
                }).then((data)=>{
                    if(!data.error){
                        console.log(data)
                        window.localStorage.setItem('token', data.token)
                        window.localStorage.setItem('user', JSON.stringify(data))
                        this.$router.push('/Profil')
                    }
                    else{
                        this.userError = true 
                    }
                })
                .catch(() => { 
                  alert('Mot de passe incorrect')
                  this.userError = true 
                })
            }
        },
        goToInscription(){
          this.$router.push('/Inscription')
      }
    } 
}
</script>

<style scoped>
img{
  height: 140px;
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

.target{
    margin-top: 5px;
    text-decoration: underline;
    cursor: pointer;
    color: #EB4426;
}

@media screen and (max-width: 450px){
    .bonjour{
        width: 70%;
    }
    #email{
        width: 95%;
    }
    #password{
        width: 95%;
    }
    .submit{
    width: 35%;
    margin: 0;
    }
}

@media screen and (max-width: 700px){
    #email{
        width: 95%;
    }
    #password{
        width: 95%;
    }
    .submit{
    width: 35%;
    margin: 0;
    }
}

@media screen and (max-width:1120px){
    #email{
        width: 55%;
    }
    #password{
        width: 55%;
    }
    .submit{
    width: 35%;
    margin: 0;
    }
}
</style>