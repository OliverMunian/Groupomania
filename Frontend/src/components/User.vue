<template>
  <div class="statut">
    <form enctype="multipart/form-data" method="POST" @submit.prevent="sendFile" >
        <div class="field">
            <label for="file" class="label"></label> <br/>
            <input v-model="message" placeholder="Quoi de neuf  ?" />
            <button type="button" class="download" @click="onPickFile">Télécharger image</button>
            <div >
              <img class="image" :src="imageUrl" >
            </div>
            <input type="file" ref="file" accept="images/*" style="display: none" @change="selectFile">

        </div>
      <button type="submit" class="submit" @submit.prevent="sendFile()">Publier</button>
    </form>
  </div>
  <div v-if="userError">
    <p>Impossible de poster le message</p>
  </div>
</template>

<script>
import axios from 'axios'
export default { 
  name: 'User',
  data(){
    return{
        connecter: true,
        message:'',
        userError: false,
        imageUrl: '',
        image: '',
    }
  },
  methods:{
        onPickFile(){
          this.$refs.file.click()
        },
        selectFile(event){
          const files = event.target.files;
          let fileName = files[0].name;
          if(fileName.lastIndexOf('.') <= 0){
            return alert('selectionnez un fichier valide')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', ()=>{
            this.imageUrl  = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
            this.image= files[0]
        },
        sendFile(){
            if(this.message =='' && this.image == null){
                alert('Vous devez renseigner tous les champs')
                this.userError = true
            }
            else{
              const formData = new FormData();
              formData.append('image', this.image)
              formData.append('message', this.message)
              axios.post("http://localhost:8082/api/post", formData, {headers: {'Content-Type': 'multipart/form-data', "Authorization":"Bearer " + localStorage.getItem("token")}})
              .then((res)=>{
                console.log(res)
                alert("Votre post a bien été publié !")
                this.$router.push('/Home')
              })
              .catch(() => { this.userError = true })
            }
        },
    },
    mounted(id){
      axios.get("http://localhost:8082/api/post/" + id,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
      .then(function(response){
          return response;
      })
      .catch((error) => {error})
    },
}
</script>

<style scoped>
.statut {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    width: 30%;
    padding: 15px;
}

.field{
  width: 100%;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

form input {
  width: 70%;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid #808080ad;
}

input:nth-child(2) {
  height: 20px;
}

.image{
  height: 220px;
}

button {
  margin: 10px;
  width: 35%;
}

@media screen and (max-width:1020px){
  .statut{
    width: 45%;
  }
}

@media screen and (max-width:820px){
  .statut{
    width: 55%  
  }
}

@media screen and (max-width:720px){
  .statut{
    width: 65%  
  }
}
</style>
