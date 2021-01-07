import React from "react";

const Bid = ({bye}) =>{

    
    const bayers= bye.slice(0,5).map((list)=>{
        return(
            <div style={{display:"flex"}} key={list.price}>
                <div>
                    {list.size}
                </div>
                <div  style={{paddingLeft:10}}>
                    {list.price}
                </div>
            </div>
        );
        
    })

    return(
        <div>
            {bayers}
            <div style={{display:"flex"}}>
                    <div>Bid</div>
            </div>
        </div>
    );
};

export default Bid;