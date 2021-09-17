import React, { useEffect, useState } from "react";

//TODO: Have to implements socket programming to dynamically update list based on server-side song queue.
var convertSongList = (list) => {
    if(list.length !== 0){
        return list.map((num) => <li>{num}</li>)
        //console.log(list);
    }
    else{
        return <p>empty list</p>
        //console.log("array is empty");
    }
}
var updateList = (list,updatelst,toAdd) => {
    if(toAdd === true){
        var ele = list[list.length-1] + 1;
        var newLst = [...list,ele]
        console.log(`Adding ${ele} to list`);
        updatelst(newLst);
    }
    else{
        if(list.length > 1){
            var newLst = [...list];
            console.log(`removing number ${newLst.pop()} from list`);
            updatelst(newLst);
        }
    }
}

function SongList() {
    var [list, setList] = useState([1]);
    useEffect(() => {
        convertSongList(list)
    }, [list])
    return(
        <div>
            <button onClick={() => {updateList(list,setList,true)}}>add Element</button>
            <button onClick={() => {updateList(list,setList,false)}}>remove Element</button>
            <ul>
                {convertSongList(list)}
            </ul>
        </div>
    );
}
export default SongList;