import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearchPipe',
  standalone: false
})
export class UserSearchPipePipe implements PipeTransform {

  transform(users: any[], searchItem: string): any[] {
   if(!users||!searchItem){
    return users;
   }

   const term = searchItem.toLowerCase()
   console.log("inside tearm",searchItem);
   
   return users.filter(user=>{
    for(const key in user){
      const value = user[key];

      if(value && typeof value ==='object'){
        for(const nestedKey in value){
          const nestedValue  = value[nestedKey];
          if(nestedValue&&nestedValue.toString().toLowerCase().includes(term)){
            console.log("true filter",user,term);
            return true
            
          }
        }
      }
      else if(value&&value.toString().toLowerCase().includes(term)){
        return true;
        console.log("2true filter",user);
      }
    }
    return false
   })
  }

}
