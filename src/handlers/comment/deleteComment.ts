import { Request, Response } from 'express';

import Coment from '../../models/comment';
import Post from '../../models/posts';
import validateUser from '../../utils/validateUser';

async function deleteComment(req: Request, res: Response) {
  validateUser(req, res);
  const { commentId } = req.params;
  const { postId } = req.body;
  try {
    await Coment.deleteOne({
      _id: commentId,
    });
    await Post.update(
      { _id: postId },
      { $pull: { comments: commentId } },
    );
    return res.status(200).json({ error: null, commentId, postId });
  } catch (error) {
    return res.status(500).json({ user: null, error, });
  }
}

export default deleteComment;
