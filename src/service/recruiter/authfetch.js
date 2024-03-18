const baseUrl = "http://localhost:4444";


const authFetch = (url,method,body) => {

    let token = JSON.parse(localStorage.getItem("token"))

    return fetch(baseUrl + url,{
        method : method,
        headers : {
            'Content-Type' : "application/json",
            'Authorization' : 'Bearer ' + token.token
        },
        body :JSON.stringify(body)})
    .then(y => y.json())
}

export const authFetchGet = (url,method) => {

    let token = JSON.parse(localStorage.getItem("token"))

    return fetch(baseUrl + url,{
        method : method,
        headers : {
            'Content-Type' : "application/json",
            'Authorization' : 'Bearer ' + token.token
        }
      
    
}).then(y => y.json())
}


export default authFetch;