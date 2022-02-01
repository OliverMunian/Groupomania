<template>
  <div class="container">
    <h1>Modifier votre post ici</h1>
    <div class="post">
      <form enctype="multipart/form-data" method="PUT" @submit.prevent="sendFile(post.id)">
          <div class="field">
              <input class="message" v-model="post.message">
              <div v-if="post.imageUrl" class="image" id="imageOnChange" >
                <img class="image" id="image" :src="imageUrl" @click="onPickFile">
                <div class="remove" id="remove">
                  <button  type="button" @click="removePickFile()" >X</button>
                </div>
              </div>
              <input type="file" id="inputFile" ref="file" accept="images/*" @change="selectFile">
          </div>
        <button type="submit" class="submit">Terminé</button>
      </form>
    </div>
  </div>
  <router-view></router-view>
</template>


<script>
import axios from 'axios'
export default {
  name: "Modification",
    data() {
    return {
      user: null,
      post: {},
      imageUrl:'',
      image:'',
      postId:null,
      message: ""
    };
  },
  methods: {
    onPickFile(){
      this.$refs.file.click()
    },
    selectFile(event){
      console.log(event)
      const files = event.target.files;
      let fileName = files[0].name;
      if(fileName.lastIndexOf('.') <= 0){
        return alert('selectionnez un fichier valide')
      }
      const div  =  document.getElementById('imageOnChange')
      const fileReader = new FileReader()
      fileReader.addEventListener('load', ()=>{
        this.imageUrl  = fileReader.result
        div.style.display = "block"
      })
      fileReader.readAsDataURL(files[0])
        this.image= files[0]
    },
    removePickFile(){
      const img  =  document.getElementById("image")
      const inputFile = document.getElementById('inputFile')
      console.log(img.src)
      this.imageUrl = null ;
      img.src == null;
      inputFile.value = "";
      // div.style.display = "none";
      console.log(this.image)
      console.log(this.imageUrl)
      this.image == null
    },
    sendFile(){
      if(this.post.message == '' && this.image ==  ''){
        console.log(this.post.message)
        alert('Vous devez renseigner au moins un des deux champs')
        this.userError = true
      }
      else{
        const formData = new FormData();
        console.log(this.image)
        formData.append('image', this.image)
        formData.append('message', this.post.message)
        axios.put("http://localhost:8082/api/post/" + this.postId, formData, {headers: {'Content-Type': 'multipart/form-data', "Authorization":"Bearer " + localStorage.getItem("token")}})
        .then((res)=>{
          console.log(res)
          this.imageUrl  = this.image
          this.message = this.post.message
          // console.log(this.message)
          alert("Votre post a bien été modifié !")
          this.afficher();
          this.$router.push('/Home')
        })
        .catch(() => { this.userError = true })
        }
    },
    afficher() {
      axios
      .get("http://localhost:8082/api/post/" + this.postId, { headers: {'Content-Type': 'multipart/form-data',"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then((response) => {
          this.post = response.data;
          this.imageUrl = response.data.imageUrl
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // modifier(){
    //     axios.put("http://localhost:8082/api/post/" + this.postId, {message: this.post.message}, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
    //     .then((response) => {
    //         this.post = response.data;
    //         this.imageUrl = response.data.imageUrl
    //         console.log(this.post)
    //         this.afficher();
    //         alert("Votre post a bien été modifié !")
    //         this.$router.push('/Home')
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // },
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.postId  = this.$route.params.id
    this.afficher()
  },
};
</script>

<style scoped>
.container {
  background-color: #5656560d;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}

.message{
    width: 70%;
    border-radius: 15px;
    border: 1px solid black;
    color: #083e73c4;
    height: 30px;
    margin-bottom: 20px;
    margin-top: 15px;
    border: 1px solid #8080802b;
}

.image img{
  width: 100%;
  height: 350px;
  object-fit: contain;
}

.image:hover{
  cursor: pointer;
}

.post {
  border: 1px solid #8080802b;
  background-color: white;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 35%;
}

.allcomments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
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
    width: 85%;  
  }
  .container{
    padding-top: 30px;
  }
}
@media screen and (max-width:350px){
  .post{
    width: 75%  
  }
  .container{
    padding-top: 30px;
  }
}
</style>