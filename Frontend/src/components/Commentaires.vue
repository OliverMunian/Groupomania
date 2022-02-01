<template>
    <div v-for="commentaire in commentaires" :key='commentaire.id' class="commentaire">
        <div class="user-commentaire">
            <p class="user"> {{commentaire.prenom}} {{commentaire.nom}}</p>
            <p> {{commentaire.message}}</p>
        </div>
        <div class="delete" @click="removeComment(commentaire.id)" v-if="user.userId == commentaire.userId || user.isAdmin"> X </div>
    </div>
    <div class="buttons">
        <input class="commenter" id="commenter" v-model="message" placeholder="Ajouter un commentaire...">
        <button id="sub" @click="commenter()">Commenter</button> 
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Commentaires',
  props: [
      "post", "commentaire","user"
  ],
  data(){
        return{
            commentaires:[],
            message:'',
        }
    },
    methods:{  
        displayComments(){
            axios.get('http://localhost:8082/api/post/' + this.post.id + '/comment',{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response)=>{ 
                this.commentaires = response.data
            })
            .catch((error)=> { 
                console.log(error)
            })
        },

        modifyComment(commentaireId){
            axios.put('http://localhost:8082/api/post/' + this.post.id + '/comment/' + commentaireId,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((response)=>{ 
                this.comment = response.data
            })
            .catch((error)=> { 
                console.log(error)
            })
        },
        removeComment(commentaireId){
            console.log(commentaireId)
            axios.delete('http://localhost:8082/api/post/' + this.post.id + '/comment/' + commentaireId,{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then((res)=>{
                console.log(res)
                alert('Le commentaire a bien été supprimé !')
                this.displayComments()
            })
            .catch((error)=> { 
                console.log(error)
            })
        },
        commenter(){
            if(!this.message == true){
                alert('Veuillez remplir le champ pour commenter')
            }
            else{
                axios.post('http://localhost:8082/api/post/' + this.post.id + '/comment',{message: this.message},{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then((response)=>{
                    console.log(response)
                    this.message =''
                    alert('Commentaire posté')
                    this.displayComments()
                })
                .catch((error)=> { 
                    console.log(error)
                })
            }
        },
    },
    mounted(){
        this.displayComments();
    }
}
</script>

<style scoped>
p{
    font-size: 30px;
    text-align: center;

}

.user-commentaire{
    line-height: 5px;
}

.user{
    font-weight: bold;
    font-size: 15px;
}

.commentaire{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px 0px;
    background-color: #80808038;
    border-radius: 20px;
    color: #083e73c4;
    margin-left: 15px;
    padding-right: 15px;
    width: max-content;

}

.commentaire p{
    font-size: 15px;
    text-align: left;
    margin-left: 10px;
}

.commenter{
    background-color: #80808038;
    border-radius: 20px;
    height: 25px;
    color: #083e73c4;
    border: 1px solid #808080ad ;
}

.delete{
    display: flex;
    justify-content: flex-end;
    margin: 8px;
    cursor: pointer;
    font-size: 12px;
}

.buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
}

input{
    border: 1px solid black;;
    text-align: center;
    margin: 10px;
    width: 50%;
}
</style>
