import { createPostReq, postCommentsReq } from "../datamodels/post.model";
import Comments from "../models/Comments";
import CommentsLikes from "../models/Commentslike";
import Post from "../models/Post";
import PostLike from "../models/Postlikes";
import { DBUser } from "../models/User";


// create a new post
export const createNewPost = async (data: createPostReq, userdata: DBUser) => {

    const post = new Post({
        ...data,
        createdby: userdata._id
    });
    const newPost = await post.save();
    return newPost;
};

// fetch post via ID
export const fetchPostViaID = async (id: string) => {
    const post = await Post.findOne({ _id: id , visible: true});
    return post;
};

// fetch comment via ID
export const fetchcommentViaID = async (id: string) => {
    const comment = await Comments.findOne({ _id: id, visible: true });
    return comment;
};

// fetch post like via post
export const fetchPostLikeViaPost = async (id: string, userid: string) => {
    const post = await PostLike.findOne({ post: id, user: userid, visible: true });
    return post;
};

// fetch comment like via comment
export const fetchCommentLikeViaPost = async (id: string, userid: string) => {
    const post = await CommentsLikes.findOne({ comment: id, user: userid , visible: true});
    return post;
};

// create a new comment
export const createNewComment = async (data: postCommentsReq, userdata: DBUser) => {

    const post = new Comments({
        comment: data.comment,
        post: data.postId,
        user: userdata._id
    });
    const newPost = await post.save();
    return newPost;
};

// fetch all investments
export const fetchAllPosts = async (data: any) => {

    let page = data.page || 1;
    let limit = data.limit || 20;


    const allPosts = await Post.find({}).skip((page - 1) * limit).limit(limit).
        populate(
            {
                path: 'createdby',
                select: '-password -createdAtDate -updatedAtDate -visible -createdAt -updatedAt'
            }
        );
    return allPosts;
};

// count posts
export const countAllposts = async (data: any) => {
    const allposts = await Post.count();
    return allposts;
};

// update post counts
export const updatePostCount = async (id: string, count: number, user: any, add: boolean = true) => {
    let numbercount = add ? 1 : -1;
    let newPostdata = await Post.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                likecount: count + numbercount
            },
        },
    );

    if (add) {
        const postlike = new PostLike({
            user: user._id,
            post: id
        });
        const newPost = await postlike.save();
    } else {
        const postlike = await PostLike.findOneAndUpdate(
            {
                user: user._id,
                post: id
            },
            {
                $set: {
                    visivle: false
                },
            },
        );
    }

    return newPostdata;
};


// update post counts
export const updateCommentLikeCount = async (id: string, count: number, user: any, post: any, add: boolean = true) => {
    let numbercount = add ? 1 : -1;
    let newPostdata = await Comments.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                likecount: count + numbercount
            },
        },
    );

    if (add) {
        const postlike = new CommentsLikes({
            user: user._id,
            post: id,
            comment: id
        });
        const newPost = await postlike.save();
    } else {
        const postlike = await CommentsLikes.findOneAndUpdate(
            {
                user: user._id,
                post: id,
                comment: id
            },
            {
                $set: {
                    visible: false
                },
            },
        );
    }

    return newPostdata;
};

