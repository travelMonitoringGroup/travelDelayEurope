export function createMainInfo(importedInfo, liczbaInfo){

    /* sortuje po wartościach opóźnienia */
    function compareByDelayTime(a,b){
        return b.delayTime.match(/\d+/)[0] - a.delayTime.match(/\d+/)[0];
    }
    importedInfo.sort(compareByDelayTime);

    let ii;
    for(ii=0;ii<liczbaInfo;ii++){
        const delayedDiv = document.createElement("div");
        delayedDiv.setAttribute("class", "info-module-holder");
        let flagRoute; let trainIconRoute;
        if (importedInfo[ii].motherland === "PL"){
            flagRoute = "/images/flagPL.png";
        }
        if(importedInfo[ii].trainNumber.includes("IC" || importedInfo[ii].trainNumber.includes("EIC") ||importedInfo[ii].trainNumber.includes("TLK"))){
            trainIconRoute = "/images/ICpic2.png"
        } else{
            trainIconRoute = "/images/Rpic2.png"
        }
        let czyZawieraStacjeWyszukiwania = false;
        importedInfo[ii].midStations.forEach((el)=>{
            if(el.includes(importedInfo[ii].searchLocation)){
                czyZawieraStacjeWyszukiwania = true;
            }
        });
        if(!czyZawieraStacjeWyszukiwania){importedInfo[ii].destination = " Train no. is not unique in EU"}
        delayedDiv.innerHTML = `
        <div></div>
            <div>
                <p class="p-lebel-style"> Time + delay: </p>
                <p class="p-style">${importedInfo[ii].regularTime + " + "+importedInfo[ii].delayTime.match(/\d+/)[0]+"min"}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Station: </p>
                <p class="p-style">${importedInfo[ii].searchLocation}</p>
            </div>

            <div>
                <image class="miniaturka-flag" src=${flagRoute}>
            </div>

            <div></div>

            <div></div>

            <div>
                <p class="p-lebel-style"> Train no:</p>
                <p class="p-style"> ${importedInfo[ii].trainNumber}</p>
            </div>

            <div>
                <p class="p-lebel-style"> Destination:</p>
                <p class="p-style"> ${importedInfo[ii].destination}</p> 
            </div>

            <div>
                <image class="miniaturka-train" src=${trainIconRoute}>
            </div>

            <div></div>
            
            `; 
            document.querySelector(".info-holder").appendChild(delayedDiv);
            
            if(ii%5==0 && ii!=0){
                console.log("reklama")
                console.log(ii)
                const adDiv = document.createElement("div");
                adDiv.setAttribute("class", "add");
                adDiv.innerHTML = `
                <div class="add"></div>
                `;
                document.body.appendChild(adDiv);
            }
    };
}