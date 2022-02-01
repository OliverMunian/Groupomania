<template>
  <div id="afficher">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="utilisateur-post">
        <div class="utilisateur">
          <p class="nom-prenom">{{post.User && post.User['prenom']}} {{post.User && post.User['nom']}}</p>
          <p class="date"> Posté le {{ post.formatDate}}</p>
        </div>
        <div class="button" v-if="user.userId == post.userId || user.isAdmin">
          <button @click="supprimer(post.id)" >X</button>
        </div>
      </div>
      <p class="post-message">{{ post.message }}</p>
      <div v-if="post.imageUrl" class="image">
        <img class="post-image" :src="post.imageUrl">
      </div>
      <div class="button1">
        <button v-if="user.userId == post.userId || user.isAdmin" @click="modifier(post.id)">Modifier</button>
      </div>
      <div class="allcomments">
        <Commentaires :user="user" :post="post" />
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import Commentaires from "../components/Commentaires.vue";

import moment from "moment"
import axios from 'axios'
export default {
  components: { Commentaires },
  name: "Home",
  data() {
    return {
      user: null,
      posts: [],
      commentaires: [],
      message: "",
      imageUrl: ''
    };
  },
  methods: {
    afficher() {
      axios
      .get("http://localhost:8082/api/post", { headers: {'Content-Type': 'multipart/form-data',"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then((response) => {
          this.posts = response.data.map(p => {
            let date = moment(p.created)
            p.formatDate = date.format('DD/MM/YYYY HH:mm')
            return p;
          })
          console.log(response.data[0].User)
          this.imageUrl = response.data.imageUrl
        })
        .catch((error) => {
          console.log(error);
        });
    },
    supprimer(postId) {
      console.log(postId);
      axios
      .delete("http://localhost:8082/api/post/"  + postId , { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
        .then(() => {
          alert('le post a bien été supprimé')
          this.afficher();  
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifier(postId){
      console.log(postId)
      this.$router.push("/Modification/"+ postId);
    },
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.afficher();
  },
};
</script>

<style scoped>
#afficher {
  padding-top: 30px;
  background-color: #5656560d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button {
  margin: 15px;
}

.image img{
  width: 100%;
  height: 350px;
  object-fit: contain;
}

.nom-prenom{
  color: #083e73c4;
  font-weight: bold;
  font-size: 25px;
}

.date{
  font-size: 12px;
  color: #808080ad;
}

.utilisateur-post{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #808080ad;
  line-height: 1px;
}
.utilisateur{
  text-align: left;
  padding-left: 10px;
  flex-direction: column;
}

.post {
  background-color: white;
  border: 1px solid #8080802b;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 35%;
}

.post-message{
  text-align: left;
  margin-left: 10px;
}

.allcomments {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #8080802b;
  margin-top: 25px;
  width: 100%;
}

.delete {
  position: absolute;
  color: white;
  font-size: 13px;
}

.home img {
  height: 220px;
}

@media screen and (max-width:1020px){
  .post{
    width: 45%  
  }
}

@media screen and (max-width:820px){
  .post{
    width: 55%  
  }
}

@media screen and (max-width:720px){
  .post{
    width: 65%  
  }
}
@media screen and (max-width:450px){
  .post{
    width: 85%  
  }
}
</style>