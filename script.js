const API = "http://192.168.1.7:5000";

async function getInfo() {
    const url = document.getElementById("url").value;

    const res = await fetch(API + "/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
    });

    const data = await res.json();

    document.getElementById("title").innerText = data.title;
    document.getElementById("thumb").src = data.thumbnail;
}

async function downloadMP3() {
    const url = document.getElementById("url").value;

    const res = await fetch(API + "/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url })
    });

    const blob = await res.blob();
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.download = "song.mp3";
    link.click();
}
