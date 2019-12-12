const GitHubService = require('../services/gitHub');
const { Repository } = require('../models');

exports.getRepositories = async (req, res, next) => {
    const { page, per_page, lang } = req.query

    const { count, rows} = await GitHubService.importFromGitHub({
        languages: lang ? [lang] : ['java', 'javascript', 'python', 'php', 'ruby'],
        page,
        per_page
    })

    res.json({
        count,
        rows
    });
};

exports.getRepository = async (req, res, next) => {
    const repository = await Repository.findByPk(req.params.id)
    if (repository == null) {
        res.status(404).send('Repository not found!');
        return 
    }
    res.json(repository);
};