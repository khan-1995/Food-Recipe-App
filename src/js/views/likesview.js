import {elements} from "./base";


export const toogleheart = isLiked => {
    const str = isLiked ?  `icon-heart` : `icon-heart-outlined`;

    document.querySelector(`.recipe__love  use`).setAttribute(`href`,`img/icons.svg#${str}`);
};