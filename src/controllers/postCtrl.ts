
import { LogError } from "../components/helperComponent";
import { countAllposts, createNewComment, createNewPost, fetchAllPosts, fetchPostViaID } from "../components/postComment";
import { createPostReq, postCommentsReq } from "../datamodels/post.model";
import { createPostSchema, postCommentSchema } from "../middleware/validation";
import { DBPost } from "../models/Post";
import { DBUser } from "../models/User";



// A logged in user should  be able to create post
export const createPost = async (req: any, res: any) => {
    try {
        let postData: createPostReq = req.body;
        let user: DBUser = req.user;
        // Validate form
        await createPostSchema.validateAsync(postData);


        let newPost = await createNewPost(postData, user)
        // return
        res.status(200).json({
            status: 'success',
            message: "New post created successfully.",
            newPost
        });
    } catch (error) {
        LogError(error, "createPost")
        if (error.isJoi) return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
};

// Any user should be able to view all posts
export const paginatePosts = async (req: any, res: any) => {
    try {
        let { page, limit } = req.query;
        page = Number(page||1);
        limit = Number(limit||10);
        let allposts:DBPost= await fetchAllPosts({ page, limit })
        let countAll = await countAllposts({ page, limit });
        // return
        res.status(200).json({
            status: 'success',
            message: "All posts fetch successfully.",
            data:allposts,
            pager: {
                page,
                limit,
                totalItem: countAll,
                totalPages: Math.ceil(countAll / limit),
            }
        });
    } catch (error) {
        LogError(error, "createPost")
        if (error.isJoi) return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
};

// Any user should be able to view all posts
export const commentOnPosts = async (req: any, res: any) => {
    try {
        let commentData: postCommentsReq = req.body;
        let user: DBUser = req.user;
        // Validate form
        await postCommentSchema.validateAsync(commentData);

        let postData = await fetchPostViaID(commentData.postId)

        if (!postData) {
            return res.status(400).json({
                status: 'error',
                message: 'You can\'t comment on a post that doesn\'t exist',
            });
        }

        let newComment = await createNewComment(commentData, user)
        // return
        res.status(200).json({
            status: 'success',
            message: "New post created successfully.",
            newComment
        });
    } catch (error) {
        LogError(error, "createPost")
        if (error.isJoi) return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
};