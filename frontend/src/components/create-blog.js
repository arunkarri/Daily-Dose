import React, { useState, useRef } from 'react';
import RichTextEditor from 'react-rte';
import ReactTags from 'react-tag-autocomplete';
import './react-tags.css';
import store from '../storage';
import env from '../env';
import { useAlert } from 'react-alert';

const CreateBlog = () => {
  const defaultRte = RichTextEditor.createEmptyValue();
  const [rteValue, setRteValue] = useState(defaultRte);
  const [tags, setTags] = useState([]);
  const [tagMsg, setTagMsg] = useState(false);
  const [header, setHeader] = useState('');
  const alert = useAlert();
  let type = 'success';
  const reactTags = useRef('');
  const editorRef = useRef('');

  const [suggestions, setSuggestions] = useState([
    { id: 1, name: 'Javascript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Node js' },
    { id: 6, name: 'Mongo' },
    { id: 7, name: 'JAVA' },
    { id: 8, name: 'Python' },
    { id: 9, name: 'C++' },
    { id: 10, name: 'C' },
    { id: 11, name: 'Scala' },
    { id: 12, name: 'HTML' },
    { id: 13, name: 'CSS' },
  ]);


  function onDelete(i) {
    tags.splice(i, 1);
    setTags(tags);
  }

  function onAddition(tag) {
    if (tags.indexOf(tag) === -1) {
      setTagMsg(false);
      setTags(tags.concat(tag));
    } else {
      setTagMsg(true);
    }
  }

  async function createBlog() {
    const body = { header, content: rteValue.toString('html'), date: new Date().toLocaleDateString(), tags: tags.reduce((acc, curr) => acc.concat(curr.name), []) };
    const req = await fetch(`${env}blogs/create-blog`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: store.get('token'),
        'Content-Type': 'application/json',
      },
    });
    const res = await req.json();
    if (res.statusCode !== 200) {
      type = 'error';
    }
    alert.show(res.message, {
      type: type,
    });
    reset();
  }

  function reset() {
    setHeader('');
    setRteValue(defaultRte);
    setTags([]);
    setTagMsg(false);
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="blogHeader">
          Blog title <span className="text-danger">*</span>
        </label>
        <input type="text" className="form-control" id="blogHeader" placeholder="Header" value={header} onChange={(event) => setHeader(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="blogContent">
          Your Blog Content <span className="text-danger">*</span>
        </label>
        <RichTextEditor toolbarClassName="demo-toolbar" ref={editorRef} id="blogContent" value={rteValue} onChange={setRteValue} />
      </div>
      <div className="form-group">
        <label htmlFor="blogContent">
          Tags <span className="text-danger">*</span>
        </label>
        <div className="form-group">
          <ReactTags ref={reactTags} tags={tags} suggestions={suggestions} onDelete={onDelete} onAddition={onAddition} />
          {tagMsg ? <small className="text-danger">Tag is already added</small> : ''}
        </div>
      </div>
      <br />
      <button type="button" className="btn btn-orange" onClick={() => createBlog()} disabled={header === '' || rteValue.toString('html') === '<p><br></p>' || tags.length === 0}>
        Create
      </button>
    </>
  );
};

export default CreateBlog;
