import React from "react";

export const useItemLength = (data,param)=>
{
    if(!data || data.length === 0) return 0;
   const Itemdata =  data.filter((cur)=>
    {
        return cur.type === param
    })
    return Itemdata.length
}