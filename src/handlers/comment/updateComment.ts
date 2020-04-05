
import { Request, Response } from 'express';

import Coment from '../../models/comment';
import validateUser from '../../utils/validateUser';

async function updateComment(req: Request, res: Response) {
  validateUser(req, res);
  const { commentId } = req.params;
  const { description } = req.body;
  try {
    let comment:any = await Coment.findOne({ _id: commentId});
    comment.description = description;
    await comment.save();

//     const post = await Post.updateOne(   {
//         _id: postId,
//         comments: { $elemMatch: { _id: commentId } }
//       },
//       { $set: { "grades.$.description" : description } }
//    );

    return res.status(200).json({ error: null, comment });
  } catch (error) {
    return res.status(500).json({ user: null, error, });
  }
}

export default updateComment;
