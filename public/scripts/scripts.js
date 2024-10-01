$(document).ready(function (){

    console.log("ready!");

    let newBread = document.getElementById("bread");
    let newMain = document.getElementById("main");
    let newRoughage = document.getElementById("roughage");
    let newWild = document.getElementById("wild_magic");
    let newSauce = document.getElementById("sauce");

    // const bList = [];
    // const mList = [];
    // const rList = [];
    // const wList = [];
    // const sList = [];

    // let a = 0;
    // let b = 0;
    // let c = 0;
    // let d = 0;
    // let e = 0;

    $("#br_btn").on("click", function (event) {
        console.log("bread entered");

        

        // bList[a] = newBread;
        // a++;
        // document.getElementById("bread").value = "";
    });

    $("#mn_btn").on("click", function (event) {
        console.log("main entered");

        mList[b] = newMain;
        b++;
        document.getElementById("main").value = "";
    });

    $("#rg_btn").on("click", function (event) {
        console.log("roughage entered");

        rList[c] = newRoughage;
        c++;
        document.getElementById("roughage").value = "";
    });

    $("#wm_btn").on("click", function (event) {
        console.log("wild magic entered");

        wList[d] = newWild;
        d++;
        document.getElementById("wild_magic").value = "";
    });

    $("#sc_btn").on("click", function (event) {
        console.log("sauce entered");

        sList[e] = newSauce;
        e++;
        document.getElementById("sauce").value = "";
    });

    $("#roll_btn").on("click", function (event) {
        console.log("rolling!!!");

        console.log(bList);
        console.log(mList);
        console.log(rList);
        console.log(wList);
        console.log(sList);
    });

});