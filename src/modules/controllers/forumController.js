import createHttpError from 'http-errors';
import { fileURLToPath } from 'url'
import path from 'path'
import Board from '../models/Board.js';
import { upload } from '../utils/storage.js';
import { videoTypes } from '../utils/checkFileExec.js';
import deleteFiles from '../utils/deleteFiles.js';
import { Types } from 'mongoose';

import Thread from '../models/Thread.js';
import User from '../models/User.js';
import Answer from '../models/Answer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



/* ---------- BOARDS */
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
        next(createHttpError.InternalServerError({ message: err.message }))
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
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const createBoard = async (req, res, next) => {
    try {
        const { name, title, body, position } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createError.Unauthorized('Action not allowed'))
        if (name.trim() === '') return next(createError.BadRequest('Board name must not be empty'))
        if (title.trim() === '') return next(createError.BadRequest('Board title must not be empty'))
        if (!position || !Number.isInteger(position) || position < 0) return next(createError.BadRequest('Position must be number'))

        const nameUrl = name.trim().toLowerCase().substring(0, 12).replace(/[^a-z0-9-_]/g, '')

        const nameExist = await Board.findOne({ name: nameUrl })
        if (nameExist) return next(createHttpError.Conflict('Board with this short name is already been created'))

        const newBoard = new Board({
            name: nameUrl,
            title: title.trim().substring(0, 21),
            body: body.substring(0, 100),
            position,
            createdAt: new Date().toISOString(),
            threadsCount: 0,
            answersCount: 0
        })

        const board = await newBoard.save()

        res.json({ message: "Board created sucessfully", newBoard: board })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const deleteBoard = async (req, res, next) => {
    try {
        const { boardId } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!boardId) return next(createHttpError.BadRequest('boardId must not be empty'))

        let board;
        try {
            board = await Board.findById(boardId)
            await board.deleteOne()

            res.json({ message: 'Board successfully deleted' })
        } catch (err) {
            return next(createHttpError.BadRequest({ message: "boardId not found" }))
        }

    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const editBoard = async (req, res, next) => {
    try {
        const { boardId, name, title, body, position } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!boardId) return next(createHttpError.BadRequest('boardId must not be empty'))
        if (name.trim() === '') return next(createHttpError.BadRequest('Board name must not be empty'))
        if (title.trim() === '') return next(createHttpError.BadRequest('Board title must not be empty'))
        if (!position || !Number.isInteger(position) || position < 0) return next(createHttpError.BadRequest('Position must be number'))

        const nameUrl = name.trim().toLowerCase().substring(0, 12).replace(/[^a-z0-9-_]/g, '')

        const nameExist = await Board.findOne({ name: nameUrl })
        if (nameExist) return next(createHttpError.Conflict('Board with this short name is already been created'))

        let board
        try {
            await Board.updateOne({ _id: new Types.ObjectId(boardId) }, {
                name: nameUrl,
                title: title.trim().substring(0, 21),
                body: body.substring(0, 100),
                position
            })

            board = await Board.findById(boardId)
            if (board != null) {
                res.json({ message: "Updated sucessfully", newBoard: board })
            } else {
                return next(createHttpError.BadRequest({ message: "boardId not found" }))
            }
        } catch (err) {
            return next(createHttpError.BadRequest({ message: err.message }))
        }
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}


/* ---------- THREADS */
const getRecentlyThreads = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query

        const populate = [{
            path: 'author',
            select: '_id name displayName onlineAt picture role ban'
        }, {
            path: 'likes',
            select: '_id name displayName picture'
        }]
        const threads = await Thread.paginate({}, { sort: { pined: -1, newestAnswer: -1, createdAt: -1 }, page, limit, populate })

        res.json(threads)
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const getThreads = async (req, res, next) => {
    try {
        const { boardId, limit = 10, page = 1, sort } = req.query

        if (!boardId) return next(createHttpError.BadRequest('boardId must not be empty'))

        const populate = [{
            path: 'author',
            select: '_id name displayName onlineAt picture role ban'
        }, {
            path: 'likes',
            select: '_id name displayName picture'
        }]

        let threads
        try {
            threads = await Thread.paginate({ boardId })
        } catch (err) {
            return next(createHttpError.BadRequest('boardId not found'))
        }

        if (sort === 'answersCount') {
            threads = await Thread.paginate({ boardId }, { sort: { pined: -1, answersCount: -1 }, page, limit, populate })
        } else if (sort === 'newestAnswer') {
            threads = await Thread.paginate({ boardId }, { sort: { pined: -1, newestAnswer: -1 }, page, limit, populate })
        } else {
            threads = await Thread.paginate({ boardId }, { sort: { pined: -1, createdAt: -1 }, page, limit, populate })
        }

        res.json(threads)
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const getThread = async (req, res, next) => {
    try {
        const { threadId } = req.query

        if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))

        const populate = [{
            path: 'author',
            select: '_id name displayName onlineAt picture role ban'
        }, {
            path: 'likes',
            select: '_id name displayName picture'
        }]

        let thread, board;
        try {
            thread = await Thread.findById(threadId).populate(populate)
            board = await Board.findById(thread.boardId).select('_id name title')
        } catch (err) {
            return next(createHttpError.BadRequest('threadId not found'))
        }

        res.json({ board, thread })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const createThread = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) return next(createHttpError.BadRequest({ upload: err.message }))

            const postDataString = JSON.stringify(req.body);
            const { boardId, title, body } = JSON.parse(postDataString);

            if (!boardId) return next(createError.BadRequest('boardId must not be empty'))
            if (title.trim() === '') return next(createError.BadRequest('Thread title must not be empty'))
            if (body.trim() === '') return next(createError.BadRequest('Thread body must not be empty'))

            const now = new Date().toISOString()

            let files = null
            if (req.files.length) {
                files = []
                await Promise.all(req.files.map(async (item) => {
                    if (videoTypes.find(i => i === item.mimetype)) {
                        const thumbFilename = item.filename.replace(path.extname(item.filename), '.jpg')

                        const thumbnail = await createThumb(item.path, 'forum', thumbFilename)

                        files.push({
                            file: `/forum/${item.filename}`,
                            thumb: `/forum/thumbnails/${thumbnail}`,
                            type: item.mimetype,
                            size: item.size
                        })
                    } else {
                        files.push({
                            file: `/forum/${item.filename}`,
                            thumb: null,
                            type: item.mimetype,
                            size: item.size
                        })
                    }
                }))
            }

            const newThread = new Thread({
                boardId,
                pined: false,
                closed: false,
                title: title.trim().substring(0, 100),
                body: body.substring(0, 1000),
                createdAt: now,
                author: req.payload.id,
                newestAnswer: now,
                attach: files
            })

            const thread = await newThread.save()

            await Board.updateOne({ _id: new Types.ObjectId(boardId) }, { $inc: { threadsCount: 1 }, newestThread: now })
            await User.updateOne({ _id: new Types.ObjectId(req.payload.id) }, { $inc: { karma: 5 } })

            res.json(thread)
        })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const deleteThread = async (req, res, next) => {
    try {
        const { threadId } = req.body
        const moder = req.payload.role >= 2
        let thread;

        if (!moder) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))

        try {
            thread = await Thread.findById(threadId).populate({ path: 'author', select: 'role' })
        } catch (error) {
            return next(createHttpError.BadRequest({ message: "threadId not found" }))
        }

        if (!thread.author) {
            thread.author = {
                role: 1
            }
        }
        if (req.payload.role < thread.author.role) return next(createHttpError.Unauthorized('Action not allowed'))

        if (thread.attach && thread.attach.length) {
            const files = thread.attach.reduce((array, item) => {
                if (item.thumb) {
                    return [
                        ...array,
                        path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file)),
                        path.join(__dirname, '..', '..', '..', 'public', 'forum', 'thumbnails', path.basename(item.thumb))
                    ]
                }

                return [
                    ...array,
                    path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file))
                ]
            }, [])

            deleteFiles(files, (err) => {
                if (err) console.error(err)
            })
        }

        const answers = await Answer.find({ threadId: new Types.ObjectId(threadId) })
        const answersCount = answers.length
        await Promise.all(answers.map(async (item) => {
            const answer = await Answer.findById(item._id)

            if (answer.attach && answer.attach.length) {
                const files = answer.attach.reduce((array, item) => {
                    if (item.thumb) {
                        return [
                            ...array,
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file)),
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', 'thumbnails', path.basename(item.thumb))
                        ]
                    }

                    return [
                        ...array,
                        path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file))
                    ]
                }, [])

                deleteFiles(files, (err) => {
                    if (err) console.error(err)
                })
            }

            await answer.deleteOne()
        }))

        await thread.deleteOne()

        await Board.updateOne({ _id: new Types.ObjectId(thread.boardId) }, {
            $inc: {
                threadsCount: -1,
                answersCount: -answersCount
            }
        })

        res.json({ message: 'Thread successfully deleted' })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const clearThread = async (req, res, next) => {
    try {
        const { threadId } = req.body
        const moder = req.payload.role >= 2

        if (!moder) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))

        let thread
        try {
            thread = await Thread.findById(threadId).populate({ path: 'author', select: 'role' })
        } catch (err) {
            return next(createHttpError.BadRequest('threadId not found'))
        }

        if (!thread.author) {
            thread.author = {
                role: 1
            }
        }
        if (req.payload.role < thread.author.role) return next(createHttpError.Unauthorized('Action not allowed'))

        const answers = await Answer.find({ threadId: new Types.ObjectId(threadId) })
        const answersCount = answers.length
        await Promise.all(answers.map(async (item) => {
            const answer = await Answer.findById(item._id)

            if (answer.attach && answer.attach.length) {
                const files = answer.attach.reduce((array, item) => {
                    if (item.thumb) {
                        return [
                            ...array,
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file)),
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', 'thumbnails', path.basename(item.thumb))
                        ]
                    }

                    return [
                        ...array,
                        path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file))
                    ]
                }, [])

                deleteFiles(files, (err) => {
                    if (err) console.error(err)
                })
            }

            await answer.delete()
        }))

        await Thread.updateOne({ _id: new Types.ObjectId(threadId) }, { answersCount: 0 })
        await Board.updateOne({ _id: new Types.ObjectId(thread.boardId) }, { $inc: { answersCount: -answersCount } })

        res.json({ message: 'Thread successfully cleared' })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const editThread = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) return next(createHttpError.BadRequest(err.message))

            const postDataString = JSON.stringify(req.body);
            const { threadId, title, body, closed } = JSON.parse(postDataString);
            let thread;

            if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))
            if (title.trim() === '') return next(createHttpError.BadRequest('Thread title must not be empty'))
            if (body.trim() === '') return next(createHttpError.BadRequest('Thread body must not be empty'))

            try {
                thread = await Thread.findById(threadId).populate({ path: 'author', select: 'role' })

                if (!thread.author) {
                    thread.author = {
                        role: 1
                    }
                }

                if (req.payload.id !== thread.author._id) {
                    if (req.payload.role < thread.author.role) {
                        return next(createHttpError.Unauthorized('Action not allowed'))
                    }
                }

                if (req.files.length && thread.attach && thread.attach.length) {
                    const files = thread.attach.reduce((array, item) => {
                        if (item.thumb) {
                            return [
                                ...array,
                                path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file)),
                                path.join(__dirname, '..', '..', '..', 'public', 'forum', 'thumbnails', path.basename(item.thumb))
                            ]
                        }

                        return [
                            ...array,
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file))
                        ]
                    }, [])

                    deleteFiles(files, (err) => {
                        if (err) console.error(err)
                    })
                }

                let files = thread.attach
                if (req.files.length) {
                    files = []
                    await Promise.all(req.files.map(async (item) => {
                        if (videoTypes.find(i => i === item.mimetype)) {
                            const thumbFilename = item.filename.replace(path.extname(item.filename), '.jpg')

                            await createThumb(item.path, 'forum', thumbFilename)

                            files.push({
                                file: `/forum/${item.filename}`,
                                thumb: `/forum/thumbnails/${thumbFilename}`,
                                type: item.mimetype,
                                size: item.size
                            })
                        } else {
                            files.push({
                                file: `/forum/${item.filename}`,
                                thumb: null,
                                type: item.mimetype,
                                size: item.size
                            })
                        }
                    }))
                }

                const obj = {
                    title: title.trim().substring(0, 100),
                    body: body.substring(0, 1000),
                    closed: closed === undefined ? thread.closed : closed,
                    attach: files
                }
                if (closed === undefined) {
                    obj.edited = {
                        createdAt: new Date().toISOString()
                    }
                }

                await Thread.updateOne({ _id: new Types.ObjectId(threadId) }, obj)

                const populate = [{
                    path: 'author',
                    select: '_id name displayName onlineAt picture role ban'
                }, {
                    path: 'likes',
                    select: '_id name displayName picture'
                }]
                const editedThread = await Thread.findById(threadId).populate(populate)

                res.json(editedThread)
            } catch (error) {
                return next(createHttpError.BadRequest({ message: "threadId not found" }))
            }
        })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const adminEditThread = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) return next(createHttpError.BadRequest(err.message))

            const postDataString = JSON.stringify(req.body);
            const { threadId, title, body, pined, closed } = JSON.parse(postDataString);
            const moder = req.payload.role >= 2

            if (!moder) return next(createHttpError.Unauthorized('Action not allowed'))
            if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))
            if (title.trim() === '') return next(createHttpError.BadRequest('Board title must not be empty'))
            if (body.trim() === '') return next(createHttpError.BadRequest('Thread body must not be empty'))

            const thread = await Thread.findById(threadId).populate({ path: 'author', select: 'role' })

            if (!thread.author) {
                thread.author = {
                    role: 1
                }
            }
            if (req.payload.role < thread.author.role) return next(createHttpError.Unauthorized('Action not allowed'))

            if (req.files.length && thread.attach && thread.attach.length) {
                const files = thread.attach.reduce((array, item) => {
                    if (item.thumb) {
                        return [
                            ...array,
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file)),
                            path.join(__dirname, '..', '..', '..', 'public', 'forum', 'thumbnails', path.basename(item.thumb))
                        ]
                    }

                    return [
                        ...array,
                        path.join(__dirname, '..', '..', '..', 'public', 'forum', path.basename(item.file))
                    ]
                }, [])

                deleteFiles(files, (err) => {
                    if (err) console.error(err)
                })
            }

            let files = thread.attach
            if (req.files.length) {
                files = []
                await Promise.all(req.files.map(async (item) => {
                    if (videoTypes.find(i => i === item.mimetype)) {
                        const thumbFilename = item.filename.replace(path.extname(item.filename), '.jpg')

                        await createThumb(item.path, 'forum', thumbFilename)

                        files.push({
                            file: `/forum/${item.filename}`,
                            thumb: `/forum/thumbnails/${thumbFilename}`,
                            type: item.mimetype,
                            size: item.size
                        })
                    } else {
                        files.push({
                            file: `/forum/${item.filename}`,
                            thumb: null,
                            type: item.mimetype,
                            size: item.size
                        })
                    }
                }))
            }

            const obj = {
                title: title.trim().substring(0, 100),
                body: body.substring(0, 1000),
                pined: pined === undefined ? thread.pined : pined,
                closed: closed === undefined ? thread.closed : closed,
                attach: files
            }
            if (pined === undefined && closed === undefined) {
                obj.edited = {
                    createdAt: new Date().toISOString()
                }
            }

            await Thread.updateOne({ _id: new Types.ObjectId(threadId) }, obj)

            const populate = [{
                path: 'author',
                select: '_id name displayName onlineAt picture role ban'
            }, {
                path: 'likes',
                select: '_id name displayName picture'
            }]
            const editedThread = await Thread.findById(threadId).populate(populate)

            res.json(editedThread)

            req.io.to('thread:' + threadId).emit('threadEdited', editedThread)
        })
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}

const likeThread = async (req, res, next) => {
    try {
        const { threadId } = req.body

        if (!threadId) return next(createHttpError.BadRequest('threadId must not be empty'))

        const thread = await Thread.findById(threadId)

        if (thread.likes.find(like => like.toString() === req.payload.id)) {
            thread.likes = thread.likes.filter(like => like.toString() !== req.payload.id) // unlike
        } else {
            thread.likes.push(req.payload.id) // like
        }
        await thread.save()

        const populate = [{
            path: 'author',
            select: '_id name displayName onlineAt picture role ban'
        }, {
            path: 'likes',
            select: '_id name displayName picture'
        }]
        const likedThread = await Thread.findById(threadId).populate(populate)

        res.json(likedThread)
    } catch (err) {
        next(createHttpError.InternalServerError({ message: err.message }))
    }
}
export { getBoards, getBoard, createBoard, deleteBoard, editBoard, getRecentlyThreads, getThreads, getThread, createThread, deleteThread, editThread, clearThread, likeThread, adminEditThread };
