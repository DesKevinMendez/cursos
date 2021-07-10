const jwt = require('jsonwebtoken')

// ========================
// verificar token
// ========================

let verificaToken = (req, res, next) => {

    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED_AUTENTICACION, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messages: "Token no válido"
                },
            })
        }

        req.usuario = decoded.usuario
        next();
    })

};
// ========================
// verificar token por URL
// ========================

let verificaTokenURL = (req, res, next) => {
    let { token } = req.query;

    jwt.verify(token, process.env.SEED_AUTENTICACION, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messages: "Token no válido"
                },
            })
        }

        req.usuario = decoded.usuario
        next();
    })
};

// ========================
// verificar token
// ========================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === "ADMIN_ROLE") {
        next();  
    } else {
        
        return res.status(401).json({
            ok: false,
            err: {
                messages: "No tienes los permisos para crear usuario"
            },
        })
    }

};

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenURL
}