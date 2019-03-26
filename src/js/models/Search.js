import axios from "axios";


export default class Search{

	constructor(query){
       this.query=query;
	}


async  getResult()
{
   
   try{
   const proxy='https://cors-anywhere.herokuapp.com/';
   const key = 'f5178f3e8a67486d7d3b250b74a7e6ff';
   const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
   this.result = res.data.recipes;
   // console.log(this.result);
   }

   catch(error){
          console.log(error);
   }

}


}