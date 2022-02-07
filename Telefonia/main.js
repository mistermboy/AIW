// Módulos
const Hapi = require('@hapi/hapi');
const routes = require("./routes.js");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Cookie = require('@hapi/cookie');

var fs = require('fs');
var parse = require('csv-parse');
var usuarios = [];

// Carga usuarios de fichero
fs.createReadStream("usuarios.csv")
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        usuarios.push({
            nombre:csvrow[0],
            password: csvrow[1],
        });
    })
    .on('end',function() {

    });

// Servidor
const server = Hapi.server({
    port: 8080,
    host: 'localhost',
});

const iniciarServer = async () => {
    try {
        // Registrar el Inter antes de usar directory en routes
        await server.register(Inert);
        await server.register(Vision);
        await server.register(Cookie);
        await server.auth.strategy('auth-registrado', 'cookie', {
            cookie: {
                name: 'session-id',
                password: 'secretosecretosecretosecretosecretosecretosecreto',
                isSecure: false
            },
            redirectTo: '/login',
            validateFunc: function (request, cookie){
                promise = new Promise((resolve, reject) => {

                    usuarioCriterio = {"usuario": cookie.usuario};
                    if ( cookie.usuario != null && cookie.usuario != "" &&
                        cookie.secreto == "secreto"){

                        resolve({valid: true,
                            credentials: cookie.usuario});

                    } else {
                        resolve({valid: false});
                    }
                });

                return promise;
            }
        });

        await server.register(routes);
        await server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: './views',
            layoutPath: './views/layout',
            context : {
                sitioWeb: "wallapep"
            }
        });
        await server.start();
        console.log('Servidor localhost:8080');
    } catch (error) {
        console.log('Error '+error);
    }
};

iniciarServer();
