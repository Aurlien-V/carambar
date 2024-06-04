
const Blagues = require("../models/blagues.json");


const getRandomBlagues = (array) => {

    const random = Math.floor(Math.random()*array.length);
    
    return array[random]

}


const controllerBlagues = {
    random:async(req, res) => {
        const data = await Blagues.findAll();
        console.log(data);
        const randomBlagues = getRandomBlagues(data);
        res.status(200).json({ carambarback : randomBlagues });
    },
    create: async (req, res) => {
        console.log(req.body);
        const data = await Blagues.create(req.body);
        console.log(data);
        res.status(201).json({ message: "la blague à été ajoutée", data: req.body });

    },
    findAll :  async (req, res) =>{
        const data = await Blagues.findAll();
        res.status(200).json({Blagues : data});

    },
    findById: async (req, res) => {
        const id = req.params.id;
        const data = await Blagues.findByPk(id);
        if (data) {
            res.status(200).json({ Blague: data });
        } else {
            res.status(404).json({ message: "Blague non trouvée" });
        }
    }




}
module.exports=controllerBlagues
