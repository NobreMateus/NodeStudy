const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Post = require('./models/Post');

//Config
//Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res)=>{
    Post.findAll({order: [['id', 'DESC']]}).then((posts)=>{
        var ps = [];
        posts.forEach(p=>{
            date = new Date(p.createdAt).toLocaleDateString().split('-')
            ps.push({
                id: p.id,
                titulo: p.titulo,
                conteudo: p.conteudo,
                date: `${date[2]}/${date[1]}/${date[0]}`
            })
        })
        res.render('home', {posts: ps});
    })
})

app.get('/cadastro', (req, res)=>{
    res.render('formulario');
})

app.post('/confirmaCadastro', (req, res)=>{
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(()=>{
        res.redirect('/');
    }).catch((e)=>{
        res.send("Erro ao criar post: " + e)
    })
})

app.get('/deletaPost/:id', (req, res)=>{
    Post.destroy({where: {'id': req.params.id}}).then(()=>{
        res.redirect('/');
    }).catch(()=>{
        alert("Não existe post com esse id!!");
        res.redirect('/');
    })
})


app.listen(8081, 'localhost', ()=>{
    console.log("Servidor rodando na url http://localhost:8081");
})