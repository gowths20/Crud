export const serviceCal = {

    get:(url) =>{
        return fetch(url)
    },
    post:(url,data = {method:"POST",body:{}}) => {
        return fetch(url,data) 
    }
}