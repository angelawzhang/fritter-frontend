import type { Request, Response} from 'express';
import express from 'express';
import GenreFeedCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as util from './util';
import * as freetUtil from '../freet/util';

const router = express.Router();

/**
 * Get feed
 *
 * @name GET /api/feed
 *
 * @return {Freet[]} - An array of feeds
 */
/**
 * Get feed
 *
 * @name GET /api/feed?genre=genre
 *
 * @return {Freet[]} - An array of feeds
 * @throws {403} - If user is not logged in
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string);
    const genreInput = req.query.genre == undefined ? "" : req.query.genre as string;
    const feed = await GenreFeedCollection.findByUser(userId as string, genreInput);
    const response = feed.map(freetUtil.constructFreetResponse);
    res.status(200).json(response);
  }
);

/**
 * Get genres
 *
 * @name GET /api/feed/genres
 *
 * @return {String[]} - An array of feeds
 * @throws {403} - If user is not logged in
 *
 */
 router.get(
  '/genres',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string);
    const genres = await GenreFeedCollection.findGenres(userId as string);
    res.status(200).json(genres);
  }
);

/**
 * Create a new feed.
 *
 * @name POST /api/feed
 *
 * @param {string} id - The id of the user
 * @return {GenreFeedResponse} - The created feed
 * @throws {403} - If user is not logged in
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const user = await UserCollection.findOneByUserId(req.body.id);
      const feed = await GenreFeedCollection.addOne(user);
  
      res.status(201).json({
        message: 'Your feed was created successfully.',
        feed: util.constructGenreFeedResponse(feed)
      });
    }
);

/**
 * Add a genre to a feed
 * 
 * @name PUT /api/feed
 * 
 * @param {string} genre - The name of the genre
 * @return {GenreFeedResponse} - the updated feed
 * 
 * @throws {403} - if the user is not logged in
 * 
 */
 router.put(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string);
      const feed = await GenreFeedCollection.addGenre(userId, req.body.genre);
      res.status(200).json({
        message: 'Genre added successfully.',
        feed: util.constructGenreFeedResponse(feed)
      });
    }
);

export {router as feedRouter};