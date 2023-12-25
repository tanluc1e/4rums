import createHttpError from 'http-errors';
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
        next(createHttpError.InternalServerError(err))
    }
}

const getBoard = async (req, res, next) => {
    try {
        const { name, boardId } = req.query

        let board
        if (name) {
            board = await Board.findOne({ name })
        } else if (boardId) {
            board = await Board.findById(boardId)
        } else {
            return next(createHttpError.BadRequest('Board name or boardId must not be empty'))
        }

        res.json(board)
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

export { getBoards, getBoard };