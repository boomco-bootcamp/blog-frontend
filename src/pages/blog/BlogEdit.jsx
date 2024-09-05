import React, {useMemo, useState} from 'react'

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const BlogEdit = () => {


  const [values, setValues] = useState();
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{size: ['small', false, 'large', 'huge']}],
          [{align: []}],
          ['bold', 'italic', 'underline', 'strike'],
          [{list: 'ordered'}, {list: 'bullet'}],
          [
            {
              color: [],
            },
            {background: []},
          ],
          ['image'],
        ],
      },
    };
  }, []);


  return (
    <div className='blog_create_wrap'>
      <div className="title">
        <input type="text" placeholder={"제목을 입력하세요"}/>
      </div>
      <div className="tag">
        <ul className="tag_list">
          <li className="tag_item">tag01</li>
          <li className="tag_item">tag02</li>
        </ul>
        <input type="text" placeholder={"태그를 입력하세요"}/>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={setValues}
      />
      <div className='btn_wrap'>
        <button>수정취소</button>
        <button>수정완료</button>
      </div>
    </div>
  )
}

export default BlogEdit
