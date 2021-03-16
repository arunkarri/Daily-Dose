import { useEffect, useState } from 'react';
import env from '../env';
import Spinner from './spinner';
import { useParams } from 'react-router-dom';

const ReadBlog = () => {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    getBlogById(id);
  }, []);

  async function getBlogById() {
    setIsLoading(true);
    try {
      const req = await fetch(`${env}blogs/${id}`);
      const res = await req.json();
      setBlog(res.blogs);
    } catch (err) {

    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row">
            <br />
          <h1><span className="badge badge-orange">{blog.header}</span></h1>
          
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <div className="text-center">Author - <span className="badge badge-primary">{blog.name}</span></div>
          <div className="text-center">Published on : <span className="badge badge-primary">{blog.date}</span></div>
        </div>
      )}
    </>
  );
};

export default ReadBlog;
