export interface createPostReq{
    title:string;
    description: string;
}

export interface postCommentsReq{
    comment:string;
    postId:string;
}