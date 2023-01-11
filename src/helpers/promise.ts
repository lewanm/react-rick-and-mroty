export default async function promiseHelper(promise:Promise<any>): Promise<any>{
    return promise
    .then(response=>[response])
    .catch(error=>[null,error])
}
