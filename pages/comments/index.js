import { useState } from 'react';

function CommentPage() {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchComments = async () => {
        const response = await fetch('/api/comment');
        const data = await response.json();
        setComments(data);
    };

    const submitComment = async () => {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
    };

    const deleteComment = async (commentId) => {
        const response = await fetch(`/api/comment/${commentId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
        fetchComments();
    };

    return (
        <>
            <input
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='border '
            />
            <button
                onClick={submitComment}
                className='bg-sky-700 px-5 py-2 rounded-full text-sky-100 m-2'
            >
                Submit Comment
            </button>
            <button
                onClick={fetchComments}
                className='bg-slate-700 px-5 py-2 rounded-full text-slate-100 m-2'
            >
                Load Comments
            </button>
            {comments.map((comment) => {
                return (
                    <div key={comment.id} className='mt-10 mx-2'>
                        <p className='font-bold text-lg'>{comment.name}</p>
                        <p>{comment.body}</p>
                        <button
                            onClick={() => deleteComment(comment.id)}
                            className='bg-slate-700 px-5 py-2 rounded-full text-slate-100 m-2'
                        ></button>
                    </div>
                );
            })}
        </>
    );
}

export default CommentPage;
