<template>

  <div class="posts" v-for="post in posts" :key="post.message">
    <div class="utilisateur-post">
      <div v-if="posts == true"> Rien à afficher pour le moment !</div>
      <div class="utilisateur">
        <p class="nom-prenom">{{user.prenom}} {{user.nom}}</p>
        <p class="date"> Posté le {{ post.created}}</p>
      </div>
      <div class="button" v-if="user.userId == post.userId || user.isAdmin">
        <button @click="supprimer(post.id)" >X</button>
      </div>
    </div>
    <p class="post-message">{{ post.message }}</p>
    <div v-if="post.imageUrl" class="image">
      <img class="post-image" :src="post.imageUrl" @click="modifier(post.id)">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MyPost",
  data() {
    return {
      user: null,
      message:"",
      posts: [],
    };
  },
  methods: {
    supprimer(postId) {
      console.log(postId);
      axios.delete("http://localhost:8082/api/post/" + postId, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
        .then(() => {
          alert('le post a bien été supprimé')
          this.loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadData() {
      axios.get("http://localhost:8082/api/post/me", { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
        .then((response) => {
          console.log(response);
          this.posts = response.data;
        })
        .catch((error) => console.log(error));
    },
    modifier(postId){
      console.log(postId)
      this.$router.push("/Modification/"+ postId);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.loadData();
  },
};
</script>

<style scoped>
p {
  font-size: 15px;
  text-align: center;
}
.nom-prenom{
  text-align: left;
  color: #083e73c4;
  font-weight: bold;
  font-size: 25px;
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
  padding-left: 10px;
  flex-direction: column;
}
.posts {
  border: 1px solid #8080802b;
  background-color: white;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 35%;
}
.button {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

.post-message{
  text-align: left;
  margin-left: 10px;
}

.image img{
  width: 100%;
  height: 350px;
  object-fit: contain;
}

.image img:hover{
  cursor: pointer;
}

input {
  border: 1px solid black;
  text-align: center;
  margin: 10px;
  width: 50%;
}

@media screen and (max-width:1020px){
  .posts{
    width: 45%  
  }
}

@media screen and (max-width:820px){
  .posts{
    width: 55%  
  }
}

@media screen and (max-width:720px){
  .posts{
    width: 65%  
  }
}
@media screen and (max-width:450px){
  .posts{
    width: 85%  
  }
}
</style>