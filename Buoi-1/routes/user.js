const mongoose = require("mongoose");
const Bird = require("../models/Bird");

module.exports = function(app, obj){
    
    var birdImage = ["1.png", "2.png", "3.png"];

    app.get("/", function(req, res){
        var chimse = new Bird({
            account:"asdasd",
            status:true,  // false: wating for payment, true: paid
            createdDate:Date.now(),

            name: "Chim se",
            description: "demo thoi",
            image_url:"htpp:/asdadsdasd", 
            attributes:[
                {
                    display_type:"string",
                    trait_type:"Class",
                    value:"Fire"
                },
                {
                    display_type:"string",
                    trait_type:"Power",
                    value:250
                },
                {
                    display_type:"date",
                    trait_type:"birthday",
                    value:Date.now()
                }
            ]
        });
        res.json(chimse);
    });

    app.post("/buyNewEgg", function(req, res){
        // Params: account, eggType
        if(!req.body.account || !req.body.eggType || parseInt(req.body.eggType)>2){
            res.json({result:false, data:"Wrong parameters!"});
        }else{
            var eggType = parseInt(req.body.eggType); // switch case eggType 0, 1 , 2
            var power = null;
            if(eggType==0){
                power = Math.floor(Math.random() * 101); // 0 - 100
            }else if(eggType==1){
                power = Math.floor(Math.random() * 200) + 101; // 101 - 200
            }else{
                power = Math.floor(Math.random() * 300) + 201; // 201 - 300
            }
            
            var chimse = new Bird({
                account:req.body.account,
                status:false,  // false: wating for payment, true: paid
                createdDate:Date.now(),
    
                name: "Red Bird",
                description: "This is yout new hero.",
                image_url:obj.domain + "/upload/" + birdImage[Math.floor(Math.random() * birdImage.length)], 
                attributes:[
                    {
                        display_type:"string",
                        trait_type:"Class",
                        value:"Fire"
                    },
                    {
                        display_type:"string",
                        trait_type:"Power",
                        value:power
                    },
                    {
                        display_type:"date",
                        trait_type:"birthday",
                        value:Date.now()
                    }
                ]
            });
            chimse.save(function(err){
                if(err){
                    res.json({result:false, data:"Save new bird error!"});
                }else{
                    res.json({result:true, data:chimse});
                }
            });
        }
    });
}