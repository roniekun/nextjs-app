import type {Metadata} from 'next'

  type Params ={
    
    params:{
      userId:string
    } 
  }

export async function generateMetaDa({params:{userId}}:Params): Promise<Metadata> {
  const user:string = "user";

  return {
    title: user,
    description: ""
  }

  }
