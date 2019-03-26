import {elements} from "./base";

export const getInput= ()=>elements.searchQuery.value;

export const clearInput= ()=>{elements.searchQuery.value="";};

export const clearList= ()=>{elements.recipesList.innerHTML="";
elements.search_button.innerHTML="";
}; 


const title_manipulator = (title,limit)=>{
if(title.length>limit)
{	const newtitle=[];
  title.split(" ").reduce((acc,cur)=>{
  	if(acc+cur.length<=17){
         newtitle.push(cur);
  	}
  return acc + cur.length;
  },0);

  return `${newtitle.join(" ")} ...`;
}
return title;
};


const renderRecipe= recipe=>{
const recipe_list=` <li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${title_manipulator(recipe.title,17)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
               `;
               elements.recipesList.insertAdjacentHTML("beforeend",recipe_list);
};

const Button_html=(page,type)=>
`<button class="btn-inline results__btn--${type}" data-goto=${type===`prev`? page-1 : page+1}>
<span>Page ${type===`prev`? page-1 : page+1}</span>   
<svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type===`prev`? `left` : `right`}"></use>
    </svg>
</button>`;

const renderButtons = (page,num_results,resperpage)=>{
       const pages = Math.ceil( num_results/resperpage);
        
       let buttonhtml;
       if(pages>1 && page===1){
         //goto-next
         buttonhtml=Button_html(page,`next`);
       }
       else if(page<pages){
          //goto-next
          buttonhtml=`${Button_html(page,`prev`)}
                      ${Button_html(page,`next`)}`;
          //goto-prev
       }
       else if(page===pages){
          //got-prev
          buttonhtml=Button_html(page,`prev`);
       }


   elements.search_button.insertAdjacentHTML("afterbegin",buttonhtml);


};


export const renderResult = (recipes,page=1,res_per_page=10)=>{
     const start = (page-1)*res_per_page;
     const end = page*res_per_page;
     
  recipes.slice(start,end).forEach(renderRecipe);
  renderButtons(page,recipes.length,res_per_page);
};

