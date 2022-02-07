module.exports = {
    name: 'MiRouter',

    register: async (server, options) => {

        server.route([
            {
                method: 'GET',
                path: '/',
                handler: async (req, h) => {
                    return h.view('index',
                        { usuario: 'jordán'},
                        { layout: 'base'});
                }
            },
            {
                method: 'GET',
                path: '/plain/{url}',
                handler: async (req, h) => {
                    return h.view(req.params.url,
                        { },
                        { });
                }
            },
            {
                method: 'GET',
                path: '/{url}',
                handler: async (req, h) => {
                    return h.view(req.params.url,
                        { },
                        { layout: 'base'});
                }
            },
            {
                method: 'GET',
                path: '/{param*}',
                handler: {
                    directory: {
                        path: './public'
                    }
                }
            },
        ])
    }
}
