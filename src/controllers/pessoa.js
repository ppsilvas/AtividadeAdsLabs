function list(req,res){
    return res.status(200).send("Olá Mundo!");
};

function create(req,res){
    return res.status(201).send("Olá Mundo!");
};

function update(req,res){
    return res.status(200).send("Olá Mundo!");
};

function remove(req,res){
    return res.status(200).send("Olá Mundo!");
};

module.exports = { list, create, update, remove };