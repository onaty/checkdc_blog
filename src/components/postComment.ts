import { createPostReq } from "../datamodels/post.model";
import Post from "../models/Post";
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
