<template>
    <div class="bonjour">
        <div class="home">
            <img alt="Vue logo" src="../assets/icon-above-font.png">
        </div>
        <div class="accueil">
            <div>
                Groupomania vous souhaite la bienvenue <br/>
                <br/>
                Veuillez vous connecter pour continuer <br/>
                <span class="target" @click="goToInscritpion">Vous n'avez pas encore de compte ? cliquez ici</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name:'Accueil',
  methods:{
      goToInscritpion(){
          this.$router.push('/Inscription')
      }
  }
}
</script>


<style scoped>
.home img{
  height: 220px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.bonjour{
    border: 2px solid #EB4426;
    background-color: #083E73;
    margin-top: 50px;
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    padding: 40px;
}

.accueil{
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.target{
    cursor: pointer;
    font-size: 12px;
    color: #EB4426;
    text-decoration: underline;
}

@media screen and (max-width: 450px){
    .bonjour{
      width: 70%;
    }
}
</style>