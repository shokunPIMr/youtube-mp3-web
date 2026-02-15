const API = "http://192.168.1.7";

async function checkVideo(){
    const url = document.getElementById("url").value;

    let res = await fetch(API+"/info",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url})
    });

    let data = await res.json();

    if(data.error){
        alert(data.error);
        return;
    }

    document.getElementById("preview").innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.thumbnail}" width="300"><br>
        <button onclick="download()">ดาวน์โหลด MP3</button>
    `;
}

async function download(){
    const url = document.getElementById("url").value;

    fetch(API+"/download",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url})
    })
    .then(res => res.blob())
    .then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "music.mp3";
        a.click();
    });
}
