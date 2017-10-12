import { PostComment } from './post-comment';

export interface Post {
    id?: number;

    title: string;

    url: string;

    submit_date: Date;

    comments: PostComment[];

    show?: boolean;
}
