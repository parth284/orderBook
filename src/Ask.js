import React from "react";

const Ask = ({ask}) =>{
    // console.log(ask)

    const seller= ask.slice(0,5).reverse().map((ask)=>{
        return(
            <div style={{display:"flex"}} key={ask.price}>
                <div>
                    {ask.price}
                </div>
                <div style={{paddingLeft:10}}>
                    {ask.size}
                </div>
                
            </div>
        );
    })

    return(
        <div>
            <div style={{display:"flex"}}>
                    <div>price</div>
                    <div style={{paddingLeft:15}}>Ask</div>
            </div>
            {seller}
        </div>
    );
};

export default Ask;