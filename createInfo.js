export function createInfo(importedInfo){
    importedInfo.forEach((element) => {
        const delayedDiv = document.createElement("div");
        delayedDiv.setAttribute("class", "info");
        let flagRoute; let trainIconRoute;
        if (element.motherland === "PL"){
            flagRoute = "/images/flagPL.png";
        }
        if(element.trainNumber.includes("IC" || element.trainNumber.includes("EIC") || element.trainNumber.includes("TLK"))){
            trainIconRoute = "/images/ICpic2.png"
        } else{
            trainIconRoute = "/images/Rpic2.png"
        }
        let czyZawieraStacjeWyszukiwania = false;
        element.midStations.forEach((el)=>{
            if(el.includes(element.searchLocation)){
                czyZawieraStacjeWyszukiwania = true;
            }
        });
        if(!czyZawieraStacjeWyszukiwania){element.destination = " - "}
        delayedDiv.innerHTML = `
        <div>
        </div>
            <div>
                <image class="miniaturka" src=${flagRoute}>
            </div>

            <div>
            <p></p>
                <p style="margin: 0; font-size: 18px; text-align: center;">${element.searchLocation}</p>
            </div>

            <div>
                <image class="miniaturka-train" src=${trainIconRoute}>
            </div>

            <div>
                <p> </p>
                <p style="margin: 0; font-size: 18px; text-align: center;">${element.regularTime}</p>
            </div>

            <div>
                <p> </p>
                <p style="margin: 0; font-size: 18px; text-align: center;">${"+"+element.delayTime.match(/\d+/)[0]+"min"}</p>
            </div>

            <div style="margin-left: 15px;">
                <p></p>
                <p style="margin: 0"> Destination:</p> 
                <p style="margin: 0"> Train no.:</p>
                
            </div>

            <div style="margin-left: 18px;">
                <p></p>
                <p style="margin: 0"> ${element.destination}</p> 
                <p style="margin: 0"> ${element.trainNumber}</p>
                
            </div>

            <div>
            </div>
            `;
            
            
            document.querySelector(".info-holder").appendChild(delayedDiv);
    });
}