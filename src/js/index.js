import Search from "./models/Search";
import {elements,spinner,clearLoader} from "./views/base";
import * as searchView from "./views/searchview";
import * as recipeview from "./views/reciipeview";
import * as listview from "./views/listview";
import * as likesview from "./views/likesview";
import Recipe from "./models/Recipe";
import List from "./models/ShopList";
import Likes from "./models/Likes";
// my api key f5178f3e8a67486d7d3b250b74a7e6ff

// const search = new Search();


//search controller
const state={};

const ctrlsearch = async ()=>{
console.log("hello...");

const query = searchView.getInput();
console.log(query);
 if(query){
   state.search=new Search(query);
   
     searchView.clearInput();
     searchView.clearList();
     spinner(elements.search_parent);
     
     
   try 
    { await state.search.getResult();

     clearLoader();

   searchView.renderResult(state.search.result);

   
   
    console.log("success");
  }
  catch(error){
      console.log(error);
  }
 }

}



elements.searchForm.addEventListener("submit",e=>{
 e.preventDefault();
 ctrlsearch();

});

elements.search_button.addEventListener("click",e=>{
 const btn = e.target.closest(".btn-inline");

 if(btn){
     const gotopage = parseInt(btn.dataset.goto,10);
     searchView.clearList();
     searchView.renderResult(state.search.result,gotopage);
 }

});

const ctrlrecipe = async ()=>{
const id = window.location.hash.replace("#","");

if(id){
  spinner(elements.reciperender);
   
  state.recipe=new Recipe(id);

  
try
{

  await state.recipe.getRecipe();
  state.recipe.parseIngredients();
  // console.log(state.recipe);

  clearLoader();
  recipeview.clearrecipe(); 
    recipeview.render_recipe(state.recipe);
  //calctime
  //calcservings
}
catch(error){console.log(error);}
}

};

const controlList = ()=>{
if(!state.list){
  state.list = new List();
} 



state.recipe.ingredients.forEach(el => {
const item = state.list.addItem(el.count,el.ingredient,el.unit);
listview.list_add(item);
});


};

["hashchange","load"].forEach(event => window.addEventListener(event,ctrlrecipe));

const controlLike = ()=>{
  if(!state.likes) state.likes = new Likes();
  
  const currentId =  state.recipe.id;

  if(!state.likes.isLiked(currentId)){
        const newLike = state.likes.addLike(currentId,state.recipe.title,state.recipe.author,state.recipe.img);
        console.log(state.likes);

        likesview.toogleheart(true);
  }else{
    state.likes.deleteLike(currentId);
    console.log(state.likes);
  }

}


elements.reciperender.addEventListener("click",e => {

 if (e.target.matches('.recipe__btn--add, .recipe__btn--add *'))
 {
   console.log("reached ");
   controlList();
 }

 else if(e.target.matches('.recipe__love, .recipe__love *')){
  console.log("u reached like");
  controlLike();
 }



});

