var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var Sequelize = require('sequelize');
const port = 3000
var CryptoJS = require("crypto-js");
var session = require('express-session');

var app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(session({
  secret: "akdnskjgdkjfgdkf",
  resave: false,
  saveUninitialized: true
}));

var sequelize = new Sequelize('wandero', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306
});

sequelize.authenticate().then(() => {
  console.log('yay, connected to db');
}).catch(err => {
  console.log('nope', err);
})


const Regiune = sequelize.define('regions', {
  nume: {
    type: Sequelize.STRING,
    field: 'nume'
  },
  descriere: {
    type: Sequelize.STRING,
    field: 'descriere'
  },
  poza: {
    type: Sequelize.STRING,
    field: 'poza'
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

const Utilizator = sequelize.define('utilizatori', {
  nume: {
    type: Sequelize.STRING,
    field: 'nume'
  },
  prenume: {
    type: Sequelize.STRING,
    field: 'prenume'
  },
  mail: {
    type: Sequelize.STRING,
    field: 'mail'
  },
  parola: {
    type: Sequelize.STRING,
    field: 'parola'
  },
  tara: {
    type: Sequelize.STRING,
    field: 'tara'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Obiectiv = sequelize.define('obiective', {
  titlu: {
    type: Sequelize.STRING,
    field: 'titlu'
  },
  descriere: {
    type: Sequelize.STRING,
    field: 'descriere'
  },
  tip: {
    type: Sequelize.STRING,
    field: 'tip'
  },
  subtip: {
    type: Sequelize.STRING,
    field: 'subtip'
  },
  poza: {
    type: Sequelize.STRING,
    field: 'poza'
  },
  coordonate: {
    type: Sequelize.GEOMETRY('POINT'),
    field: 'coordonate'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

const Card = sequelize.define('carduri', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: Sequelize.DATE,
    field: 'data'
  }
  // id_u: {
  //   type: Sequelize.INTEGER,
  //   field: 'id_u',
  //   foreignKey: true
  // },
  // id_obj: {
  //   type: Sequelize.INTEGER,
  //   field: 'id_obj',
  //   foreignKey: true
  // }
}, {
  timestamps: false,
  freezeTableName: true
});

Utilizator.hasMany(Card, {
  as: 'carduri',
  foreignKey: {
    allowNull: false
  }
});

Card.belongsTo(Obiectiv, {
  foreignKey: {
    primaryKey: true,
    allowNull: false
  }
});

Regiune.hasMany(Obiectiv, {
  foreignKey: 'id_r',
  sourceKey: 'id',
  foreignKeyConstraint: true
});

app.post('/removeCard', (req, res) => {
  Card.destroy({
    where: {
      utilizatoriId: req.body.uid,  //
      obiectiveId: req.body.cid //asta nu e id-ul card-ului> , nah, e ala a objectivului fgm
    }
  }).then(() => {
    res.status(201).send();
  })
});


app.post('/addCard', (req, res) => {
  Card.findOrCreate({
    where: {
      obiectiveId: req.body.obiectiveId,
      utilizatoriId: req.body.utilizatoriId
    }
  }).then((card) => {
    res.status(200).send({
      "status": '1'
    });
  })
})

app.get('/obiectiveNatura', function(req, res) {
  Obiectiv.findAll({
    where: {
      tip: 'natura'
    }
  }).then(function(obiectiveNatura) {
    res.status(200).send(obiectiveNatura);
  });
});

app.get('/obiectiveNatura/:id', function(req, res) {
  Obiectiv.findById(req.params.id, {
    where: {
      tip: 'natura'
    }
  }).then(function(obiectivNatura) {
    if (obiectivNatura) {
      res.status(200).send(obiectivNatura);
    } else {
      res.status(404).send();
    }
  });
});

app.get('/regiune/:id', function(req, res) {
  Regiune.findById(req.params.id).then(regiune => {
    if (regiune) {
      res.status(200).send(regiune);
    } else {
      res.status(404).send();
    }
  });
});

app.post('/getAllObiectiveByIds', (req, res) => {
  Obiectiv.findAll({
    where: {
      id: {
        $in: JSON.parse(req.body.ids)
      }
    }
  }).then(function(all) {
    res.status(200).send(all);
  })
})

app.get('/obiectiveCultura', function(req, res) {
  Obiectiv.findAll({
    where: {
      tip: 'cultura'
    }
  }).then(function(obiectiveCultura) {
    res.status(200).send(obiectiveCultura);
  });
});

app.get('/obiectiveCultura/:id', function(req, res) {
  Obiectiv.findById(req.params.id, {
    where: {
      tip: 'cultura'
    }
  }).then(function(obiectivCultura) {
    if (obiectivNatura) {
      res.status(200).send(obiectivCultura);
    } else {
      res.status(404).send();
    }
  });
});

app.get('/regiuni', function(req, res) {
  Regiune.findAll().then(function(regiuni) {
    res.status(200).send(regiuni);
  });
});

app.get('/utilizatori', function(req,res) {
  Utilizator.findAll().then(function(useri){
    res.status(200).send(useri);
  });
});

app.post('/registerUser', (req, res) => {
  Utilizator.create({
    nume: req.body.nume,
    prenume: req.body.prenume,
    mail: req.body.email,
    parola: CryptoJS.MD5(req.body.parola).toString(),
    tara: req.body.tara
  }).then(() => res.status(200).send({
    "mesaj": "succes"
  }))
})

app.get('/getWishListDataChart', (req,res) => {
  Card.findAll({include:[Obiectiv]}).then((s) => {
    res.send(s);
  })
})

app.post('/getRegionsName', ( req, res ) => {
  Regiune.findAll({
    where: {
      $in: [
        {
          id: req.body.ids
        }
      ]
    }
  }).then((r) => {
    res.send(r);
  })
})

app.post('/loginUser', (req, res) => {
  Utilizator.findOne({
    where: {
      mail: req.body.email,
      $and: [{
        parola: CryptoJS.MD5(req.body.password).toString()
      }]
    }
  }).then(user => {
    if (user)
      res.status(200).send({
        "status": "1",
        "user": JSON.stringify(user)
      })
    else res.status(200).send({
      "status": "0"
    })
  })
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


//
// app.delete('wishlist/:id', function(req,res) {
//   Card
//     .findById(req.params.id)
//     .then(fucntion(card){
//     if(card){
//     card.
//       destroy()
//       .then(function(){
//       res.status(204).send();
//       })
//       .catch(function(error) {
//       console.warn(error);
//       res.status(500).send('error');
//       })
//     } else {
//     res.status(404)send();
//     }
//     });
// });
