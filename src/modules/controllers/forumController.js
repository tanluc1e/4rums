import Board from '../models/Board.js';

const getBoards = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, pagination = true } = req.query

        let boards
        if (sort === 'popular') {
            boards = await Board.paginate({}, { sort: { threadsCount: -1, answersCount: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'answersCount') {
            boards = await Board.paginate({}, { sort: { answersCount: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'newestThread') {
            boards = await Board.paginate({}, { sort: { newestThread: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'newestAnswer') {
            boards = await Board.paginate({}, { sort: { newestAnswer: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else {
            boards = await Board.paginate({}, { sort: { position: -1 }, page, limit, pagination: JSON.parse(pagination) })
        }

        res.json(boards)
    } catch (err) {
        next(createError.InternalServerError(err))
    }
}

export { getBoards };