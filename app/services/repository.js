const { Repository } = require('../models')

exports.findByPk = (pk) => {
    return Repository.findByPk(pk)
};

exports.findAll = async ({ languages, page = 1, per_page = 10 }) => {  
    return Repository.findAndCountAll({
        limit: per_page,
        offset: (page - 1) * per_page
    })
};