import React from "react";

export const useItemLength = (data,param)=>
{
    if(!data || data.length === 0) return 0;
    console.log(data,param)
   const Itemdata =  data.filter((cur)=>
    {
        console.log(cur)
        return cur.type === param
    })
    console.log(Itemdata)
    return Itemdata.length
}