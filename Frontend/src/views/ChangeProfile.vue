<template>
    <div class="afficher">
        <div class="modification">
            <h1> Modifier votre profil ici {{user.prenom}} </h1>
            <div class="input" >
                <input class="input-call" v-model="user.prenom">
                <input class="input-call" v-model="user.nom">
            </div>
            <div>
                <button class="modify" @click="modify(user)"> Modifier mes informations</button>
            </div>
        </div>
        <div class="remove">
            <div>
                <button @click="remove(user)"> supprimer mon profil</button>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>


<script>
import axios  from 'axios'

export default {
  name:'ChangeProfile',
  data(){
    return{
      user:{}
    };
  },
  methods:{
        modify(){
            axios.put("http://localhost:8082/api/auth/modify" , {nom: this.user.nom , prenom: this.user.prenom}, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(() => {
                localStorage.setItem('user', JSON.stringify(this.user))
                alert('votre profil a bien été modifier')
            })
            .catch((error) => {
                console.log(error);
            });
        },
        remove(){
            axios.delete("http://localhost:8082/api/auth/delete", { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(() => {
                alert('votre profil a bien été supprimé')
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('utilisateur')
                window.location = "/"
            })
            .catch((error) => {
                console.log(error);
            });
        },

    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'))
        console.log(this.user)
    }
}
</script>

<style>
.afficher {
    background-color: #80808014;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 300px;
}
.modification{
    border: 1px solid #8080802b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
}

.input{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-call{
    text-align: center;
    margin-bottom: 10px;
}

.modify{
    margin-top: 30px;
}

.remove{
    position: absolute;
    right: 0;
}

</style>