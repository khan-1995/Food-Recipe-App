export const elements={
      searchQuery : document.querySelector(".search__field"),
      searchForm : document.querySelector(".search"),
      search_parent: document.querySelector(".results"),
      search_button: document.querySelector(".results__pages"),
      recipesList: document.querySelector(".results__list"),
      reciperender : document.querySelector(".recipe"),
      shoppinglist : document.querySelector(".shopping__list")

};

export const dom_strings={
	loader: "loader"
};

export const spinner = html_parent=>{
  const loader =`
    <div class="loader">
     <svg>
       <use href="img/icons.svg#icon-cw"></use>
     </svg>
    </div>
   `;

   html_parent.insertAdjacentHTML("afterbegin",loader);
};

export const clearLoader = ()=>{
	const loader = document.querySelector(`.${dom_strings.loader}`);
	if(loader){
		loader.parentElement.removeChild(loader);	
	}
};