const { Repository } = require('../models')
const Sequelize = require('sequelize')

exports.findByPk = (pk) => {
    return Repository.findByPk(pk)
};

exports.findAll = async ({ languages, page = 1, per_page = 10 }) => {  
    return Repository.findAndCountAll({
        where: {
            language: {
                [Sequelize.Op.in]: languages
            }
        },
        order: [
            ['stargazers', 'DESC']
        ],
        limit: per_page,
        offset: (page - 1) * per_page
    })
};