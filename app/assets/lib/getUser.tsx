
export default async function getUser( userId: number) {
    const res = await fetch(`https://placeholder.typicode.com/${userId}`) 
  return res.json()
}
