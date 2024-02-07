const hasRole = async (req = request, res = response, next) => {
    
    if(req.user.role !== "ROLE_admin"){
        return res.status(401).json({
            msg: "Token no válido - solo puede hacer esto el administrador"
        });
    }

    next();
}

module.exports = {hasRole}