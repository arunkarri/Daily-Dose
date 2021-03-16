import { useEffect, useState } from 'react';
import env from '../env';
import Spinner from './spinner';
import { useHistory } from 'react-router-dom';
import store from '../storage';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getMyBlogs();
  }, []);

  async function getMyBlogs() {
    setIsLoading(true);
    const req = await fetch(`${env}blogs/me`, {
      method: 'GET',
      headers: {
        Authorization: store.get('token'),
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    setBlogs(res.blogs);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row">
          {blogs.map((ele, index) => {
            return (
              <div key={index} className="col-xs-4 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                <div className="card ">
                  <div className="card-body">
                    <h5 className="card-title">{ele.header}</h5>
                    <div className="text-center">
                      <p>
                        <u className="text-dark">Topics</u>
                      </p>
                      {ele.tags.map((tag) => {
                        return <span className="badge badge-orange mt-2">{tag}</span>;
                      })}
                    </div>
                    <hr />
                    <p className="card-text text-center">
                      Published on: <span className="badge badge-secondary">{ele.date}</span>
                    </p>
                    <div className="float-right">
                      <button className="btn btn-orange" onClick={() => history.push(`/read-blog/${ele._id}`)}>
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyBlogs;
