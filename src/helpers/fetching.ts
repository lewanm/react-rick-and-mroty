import axios from 'axios'

export function fetching(url: string){
   return axios.get(url).then(response => {
    const {data} = response
    return data
   })
        
}