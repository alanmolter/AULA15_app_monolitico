const Task = require('../models/Task')

const getAllTasks = async (req, res) => {//modulo criado 
    try {
        const taskList = await Task.find();
        return res.render("index", { taskList, task: null, taskDelete: null });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        return res.redirect("/");
    }



    try {
        await Task.create(task)
        return res.redirect("/")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getById = async (req, res) => {
    //enviar o id como parametro da rota
    try {
        const taskList = await Task.find();

        if(req.params.method == "update"){ //verifico a url, se for update entra no if
        const task = await Task.findOne({ _id: req.params.id });
        res.render("index", { task, taskDelete: null, taskList });
        }else{
            const taskDelete = await Task.findOne({_id: req.params.id});
            res.render("index", {task: null, taskDelete, taskList});
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {//os parametros da requisição , precisão estar na ordem correta
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");//redireciona para página da lista de tarefas
        return console.log("Tarefa atualizada com sucesso!")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};




const deleteOneTask = async (req,res) => {

    try {

        await Task.deleteOne({_id: req.params.id});
        res.redirect("/");
        return console.log("Tarefa excluida com sucesso");
        
    } catch (err) {
        res.status(500).send({ error: err.message });
    }

};



module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,//necessário a virgula na ultima função
};