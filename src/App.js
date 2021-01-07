import React, { useState,useEffect } from "react";
import {data} from "./data";
import Bid from "./Bid";
import Ask from "./Ask";

const App = ()=>{

    const newDate = new Date();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();
    const date = (`${hours}:${minutes}:${seconds}`);

    const bid = []
    const ask = []
    const [newBid, setNewBid] = useState(bid);
    const [newAsk, setNewAsk] = useState(ask);
    const [sortBid,setSortBid] = useState(newBid);
    const [sortAsk,setSortAsk] = useState(newAsk);
    const [afterBid,setAfterBid] = useState(bid);
    const [afterAsk,setAfterAsk]= useState(ask);
    
    const [shares, setShares] = useState(100);
    const [input,setInput] = useState("bye");
    const [price,setPrice] = useState("11.01")


    data.map((data)=>{
        if(data.type==="buy"){
            return bid.push(data);
        }else{
            return ask.push(data);
        }
    });
    


    const bidsorting = newBid.sort((a,b)=>{return a.price - b.price})
    const asksorting = newAsk.sort((a,b)=>{return a.price - b.price})

    useEffect(()=>{
        setSortBid(bidsorting)
        setSortAsk(asksorting)
        change()
    },[])

    useEffect(()=>{
        setAfterBid(bidsorting);
        setAfterAsk(asksorting);
    },[newAsk,newBid])



    const change = ()=>{
        let changebid = JSON.parse(JSON.stringify(sortBid)) 
        let changeask = JSON.parse(JSON.stringify(sortAsk)) 

        const bidindex = changebid.findIndex(obj=>obj.price===`${price}`)
        const askindex = changeask.findIndex(obj=>obj.price===`${price}`)

        if(input==="bye"){

            if(bidindex>=0){
                if(input==="bye")
                {
                    changebid[bidindex].size=sortBid[bidindex].size+shares;
                }
            }
            else if(askindex>=0)
            {
                if(input==="ask")
                {
                    changeask[askindex].size=sortAsk[askindex].size+shares;
                }
                else
                {
                    
                    if(sortAsk[0].size>=shares)
                    {
                        if(sortAsk[0].size>shares)
                        {
                            changeask[0].size=sortAsk[0].size-shares;
                        }
                        else
                        {
                            changeask = changeask.filter(item => item.price != price)
                        }
                    }
                    else
                    {
                        let i=0;
                        let r=shares;
                        let j=1
                        let updateask
                        while(j<2)
                        {
                            r=sortAsk[i].size-r;
                            updateask = changeask.splice(1)
                            j++
                        }
                        
                        while(r<=0 && updateask[0])
                        {
                            r=Math.abs(r);
                            r=updateask[0].size-r;
                            if(r<=0)
                            {
                                updateask = updateask.splice(1);
                                changeask = updateask;
                            }
                            else
                            {
                                updateask[0].size = r;
                                changeask = updateask;
                            }
                        }
                    }
                }
            }
            else
            {  
                changebid.unshift({type:"bye", size:shares, price:`${price}`});
            }

            setNewBid(changebid);
            setNewAsk(changeask);
        }
        else{

            if(askindex>=0)
            {
                if(input==="ask")
                {
                    changeask[askindex].size=sortAsk[askindex].size+shares;
                }
            }
            else if(bidindex>=0)
            {
                if(input==="bid")
                {
                    changebid[bidindex].size=sortBid[bidindex].size+shares;
                }
                else
                {

                    if(sortBid[0].size>=shares)
                    {
                        if(sortBid[0].size>shares)
                        {
                            changebid[0].size=sortBid[0].size-shares;
                        }else
                        {
                            changebid = changebid.filter(item => item.price != price)
                        }
                    }else
                    {
                        let r=shares;
                        let j=1
                        let updatebid
                        while(j<2)
                        {
                            r=sortBid[0].size-r;
                            updatebid = changebid.splice(1)
                            j++
                        }
                        
                        while(r<=0 && updatebid[0])
                        {
                            r=Math.abs(r);
                            r=updatebid[0].size-r;
                            if(r<=0)
                            {
                                updatebid = updatebid.splice(1)
                                changebid = updatebid
                            }else
                            {
                                updatebid[0].size = r
                                changebid = updatebid;
                            }
                        }
                    }
                }
            }else
            {
                changeask.unshift({type:"ask", size:shares, price:`${price}`});
            }
            setNewAsk(changeask);
            setNewBid(changebid);
        }
    }




    return(
        <div className="container">
            <div style={{paddingLeft:10}}>
                Current Time: {date}
            </div>
            <div style={{display:"flex"}}>
                <div style={{paddingLeft:10}}>
                    <label>Enter shares</label><br/>
                    <input type="number" value={shares} onChange={(e) => setShares(parseInt(e.target.value))}  className="Shares"/>
                    <br/>
                </div>
                <div style={{paddingLeft:10}}>
                    <label>Enter price</label><br/>
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} className="price"/>
                </div>
                <div style={{padding:(10,0,0,10)}}>
                    <input type="radio" id="age1" name="age" value="bye" defaultChecked onChange={e=>setInput(e.target.value)}/>Bye
                    <br/>
                    <input type="radio" id="age2" name="age" value="ask" onChange={e=>setInput(e.target.value)}/>Sell
                </div>
                <div style={{padding:(10,0,0,15)}}>
                    <button onClick={(e)=> change()}>click</button>
                </div>
            </div>
            <div>
                <div style={{display:"flex",paddingTop:10}}>
                    <div style={{paddingLeft:10}}><h5>Without Change</h5></div>
                    <div style={{paddingLeft:80}}><h5>After Change</h5></div>
                </div>
               
                <div style={{display:"flex",padding:10}}>
                    <div style={{paddingLeft:35}}>
                        <Ask ask={sortAsk}/>
                    </div>
                    <div style={{paddingLeft:90}}>
                        <Ask ask={afterAsk}/>
                    </div>
                </div>

                <div style={{display:"flex", padding:10}}>
                    <div>
                        <Bid bye={sortBid}/>
                    </div>
                    <div style={{paddingLeft:100}}>
                        <Bid bye={afterBid}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default App;