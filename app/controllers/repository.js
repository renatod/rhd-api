const RepositoryService = require('../services/repository')
const GitHubService = require('../services/gitHub')

exports.getRepositories = async (req, res, next) => {
    const { page, per_page, lang } = req.query
    const params = {
        page,
        per_page,
        languages: lang ? [lang] : ['java', 'javascript', 'python', 'php', 'ruby']
    }

    // Load repositories from Git Hub Async.
    GitHubService.loadFromGitHub(params)

    const result = await RepositoryService.findAll(params)

    res.json(result)
}

exports.getRepository = async (req, res, next) => {
    const repository = await RepositoryService.findByPk(req.params.id)
    if (repository == null) {
        res.status(404).send('Repository not found!')
        return 
    }
    
    res.json(repository)
}
