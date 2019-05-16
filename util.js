function randomRange(min, max)
{
    return Math.random() * (max - min) + min;
}






function startCookies()
{


    function getBest()
    {
        var objs = [];
        for (var objName in Game.Objects)
        {
            var obj = Game.Objects[objName];

            if (obj != undefined)
            {
                var cps = ((obj.storedTotalCps / obj.amount) * Game.globalCpsMult);
                var newobj = {
                    name: obj.name,
                    price: obj.bulkPrice,
                    cps: cps,
                    cpsPerPrice: cps / obj.bulkPrice
                };
                if (!isNaN(cps))
                    objs.push(newobj);
            }
        }

        Game.RefreshStore();
        objs = objs.sort((a, b) => b.cpsPerPrice - a.cpsPerPrice);
        let divs = document.getElementsByClassName("title");

        for (let i = 1; i < objs.length + 1; ++i)
        {
            for (let j = 0; j < divs.length; ++j)
            {
                if (divs[j].innerText == objs[i - 1].name)
                {
                    divs[j].parentNode.getElementsByClassName("price")[0].innerText += (" #" + i + " worth buying");
                    break;
                }
            }
        }

        return objs;
    }

    var autoGoldenCookie = setInterval(function()
    {
        for (var h in Game.shimmers)
        {
            if (Game.shimmers[h].type == "golden")
            {
                Game.shimmers[h].pop();
            }
        }
    }, 1000);
    var autoBestBuy = setInterval(getBest, 1000);

}